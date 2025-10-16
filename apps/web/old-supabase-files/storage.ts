import { supabase } from '@/app/lib/supabaseClient';

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  description?: string;
}

export interface UploadResult {
  path: string;
  publicUrl: string;
  metadata: FileMetadata;
}

// Upload file to Supabase Storage
export async function uploadFile(
  bucket: string, 
  file: File, 
  path: string, 
  metadata?: Partial<FileMetadata>
) {
  // Generate unique filename if not provided
  const timestamp = Date.now();
  const fileExtension = file.name.split('.').pop();
  const fileName = `${timestamp}-${file.name}`;
  const fullPath = `${path}/${fileName}`;
  
  // Upload file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fullPath, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fullPath);
  
  return {
    path: data.path,
    publicUrl,
    metadata: {
      name: file.name,
      size: file.size,
      type: file.type,
      ...metadata
    }
  } as UploadResult;
}

// Download file from Supabase Storage
export async function downloadFile(bucket: string, filePath: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(filePath);
  
  if (error) throw error;
  return data;
}

// Delete file from Supabase Storage
export async function deleteFile(bucket: string, filePath: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);
  
  if (error) throw error;
}

// Get public URL for file
export async function getPublicUrl(bucket: string, filePath: string) {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  
  return publicUrl;
}

// List files in bucket/folder
export async function listFiles(bucket: string, folder?: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder);
  
  if (error) throw error;
  return data;
}

// Upload lead attachment
export async function uploadLeadAttachment(
  leadId: string, 
  file: File, 
  userId: string, 
  description?: string
) {
  const result = await uploadFile('lead-attachments', file, leadId, { description });
  
  // Log attachment in database
  const { error } = await supabase
    .from('attachments')
    .insert([{
      lead_id: leadId,
      user_id: userId,
      file_name: result.metadata.name,
      file_path: result.path,
      file_size: result.metadata.size,
      file_type: result.metadata.type,
      description: description,
      created_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
  
  return result;
}

// Upload deal document
export async function uploadDealDocument(
  dealId: string, 
  file: File, 
  userId: string, 
  description?: string
) {
  const result = await uploadFile('deal-documents', file, dealId, { description });
  
  // Log attachment in database
  const { error } = await supabase
    .from('attachments')
    .insert([{
      deal_id: dealId,
      user_id: userId,
      file_name: result.metadata.name,
      file_path: result.path,
      file_size: result.metadata.size,
      file_type: result.metadata.type,
      description: description,
      created_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
  
  return result;
}

// Upload profile picture
export async function uploadProfilePicture(userId: string, file: File) {
  const result = await uploadFile('profile-pictures', file, userId);
  
  // Update user's avatar_url
  const { error } = await supabase
    .from('users')
    .update({ 
      avatar_url: result.publicUrl,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);
  
  if (error) throw error;
  
  return result;
}

// Get lead attachments
export async function getLeadAttachments(leadId: string) {
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  // Get public URLs for each attachment
  const attachmentsWithUrls = await Promise.all(
    data.map(async (attachment) => {
      const publicUrl = await getPublicUrl('lead-attachments', attachment.file_path);
      return {
        ...attachment,
        public_url: publicUrl
      };
    })
  );
  
  return attachmentsWithUrls;
}

// Get deal documents
export async function getDealDocuments(dealId: string) {
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('deal_id', dealId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  // Get public URLs for each document
  const documentsWithUrls = await Promise.all(
    data.map(async (document) => {
      const publicUrl = await getPublicUrl('deal-documents', document.file_path);
      return {
        ...document,
        public_url: publicUrl
      };
    })
  );
  
  return documentsWithUrls;
}

// Delete attachment
export async function deleteAttachment(attachmentId: string) {
  // Get attachment info
  const { data: attachment, error: fetchError } = await supabase
    .from('attachments')
    .select('*')
    .eq('id', attachmentId)
    .single();
  
  if (fetchError) throw fetchError;
  
  // Determine bucket based on attachment type
  const bucket = attachment.lead_id ? 'lead-attachments' : 'deal-documents';
  
  // Delete from storage
  await deleteFile(bucket, attachment.file_path);
  
  // Delete from database
  const { error: deleteError } = await supabase
    .from('attachments')
    .delete()
    .eq('id', attachmentId);
  
  if (deleteError) throw deleteError;
}

// Create storage buckets (run once during setup)
export async function createStorageBuckets() {
  const buckets = [
    { name: 'lead-attachments', public: true },
    { name: 'deal-documents', public: true },
    { name: 'profile-pictures', public: true }
  ];
  
  for (const bucket of buckets) {
    const { data, error } = await supabase.storage.createBucket(bucket.name, {
      public: bucket.public,
      allowedMimeTypes: bucket.public ? ['image/*', 'application/pdf', 'text/*'] : null,
      fileSizeLimit: 10 * 1024 * 1024 // 10MB limit
    });
    
    if (error && !error.message.includes('already exists')) {
      throw error;
    }
  }
}

// Get file size in human readable format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Validate file type
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      return file.type.startsWith(type.slice(0, -1));
    }
    return file.type === type;
  });
}

// Validate file size
export function validateFileSize(file: File, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}
