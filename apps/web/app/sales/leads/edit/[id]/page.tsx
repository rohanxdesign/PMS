"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { Avatar } from "@/app/components/ui/Avatar";
import { Dropdown } from "@/app/components/ui/Dropdown";
import { DealsGrid } from "@/app/components/ui/DealsGrid";
import { Edit3, Info, ChevronDown, Search, Save, X, ArrowLeft } from "lucide-react";
import { useLeads } from "@/app/context/LeadsContext";

export default function EditDeal() {
  const router = useRouter();
  const params = useParams();
  const { addLead, addDeal, updateLead, updateDeal, getLeadById, getDealsByLeadId } = useLeads();
  
  const leadId = params.id as string;
  const isEditMode = leadId && leadId !== 'new';
  
  // Form state
  const [formData, setFormData] = useState({
    dealName: "",
    companyName: "",
    companyDescription: "",
    pocName: "",
    pocPhone: "",
    companyWebsite: "",
    contactEmail: "",
    linkedinUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    stage: "New",
    closeDate: "",
    country: "India",
    industry: "",
    owner: "Kamal",
    amount: "",
    remarks: "",
    clientPriority: "Medium",
    openToConversation: "Yes",
    sellerStatus: "Verified",
    clientPotential: "One-time project",
    sectors: [] as string[],
    suggestedCompanies: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newSector, setNewSector] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [showDealsGrid, setShowDealsGrid] = useState(false);
  const [currentLead, setCurrentLead] = useState<any>(null);

  // Available options with badge configurations
  const stages = ["New", "Contacted", "Meeting Booked", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];
  const countries = ["India", "Nepal"];
  const owners = ["Kamal", "Alex", "Priya", "Rohan", "Maya"];
  const priorities = [
    { value: "Low", label: "Low", badge: { color: "gray" as const, text: "Low" } },
    { value: "Medium", label: "Medium", badge: { color: "yellow" as const, text: "Medium" } },
    { value: "High", label: "High", badge: { color: "red" as const, text: "High" } }
  ];
  const conversationOptions = ["Yes", "No"];
  const sellerStatuses = [
    { value: "Verified", label: "Verified", badge: { color: "green" as const, text: "Verified" } },
    { value: "Unverified", label: "Unverified", badge: { color: "gray" as const, text: "Unverified" } },
    { value: "Pending", label: "Pending", badge: { color: "yellow" as const, text: "Pending" } }
  ];
  const clientPotentials = ["One-time project", "OTA", "Multi Interest"];

  // Load existing data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const existingLead = getLeadById(leadId);
      if (existingLead) {
        setCurrentLead(existingLead);
        const deals = getDealsByLeadId(leadId);
        
        // If lead has multiple deals, show deals grid
        if (deals.length > 1) {
          setShowDealsGrid(true);
        } else if (deals.length === 1) {
          // If only one deal, load it directly
          const deal = deals[0];
          setSelectedDeal(deal);
          setFormData({
            dealName: deal.name,
            companyName: existingLead.company || "",
            companyDescription: "",
            pocName: "",
            pocPhone: "",
            companyWebsite: "",
            contactEmail: existingLead.email || "",
            linkedinUrl: "",
            facebookUrl: "",
            instagramUrl: "",
            stage: deal.stage,
            closeDate: "",
            country: existingLead.country,
            industry: existingLead.industry || "",
            owner: deal.owner,
            amount: deal.amount.toString(),
            remarks: deal.remarks || "",
            clientPriority: "Medium",
            openToConversation: "Yes",
            sellerStatus: "Verified",
            clientPotential: "One-time project",
            sectors: [],
            suggestedCompanies: [],
          });
        } else {
          // No deals, load lead data for creating new deal
          setFormData({
            dealName: existingLead.name,
            companyName: existingLead.company || "",
            companyDescription: "",
            pocName: "",
            pocPhone: "",
            companyWebsite: "",
            contactEmail: existingLead.email || "",
            linkedinUrl: "",
            facebookUrl: "",
            instagramUrl: "",
            stage: existingLead.stage,
            closeDate: "",
            country: existingLead.country,
            industry: existingLead.industry || "",
            owner: existingLead.owner,
            amount: existingLead.totalAmount.toString(),
            remarks: existingLead.remarks || "",
            clientPriority: "Medium",
            openToConversation: "Yes",
            sellerStatus: "Verified",
            clientPotential: "One-time project",
            sectors: [],
            suggestedCompanies: [],
          });
        }
      }
    }
  }, [isEditMode, leadId, getLeadById, getDealsByLeadId]);

  // Form handling functions
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddSector = () => {
    if (newSector.trim() && !formData.sectors.includes(newSector.trim())) {
      setFormData(prev => ({
        ...prev,
        sectors: [...prev.sectors, newSector.trim()]
      }));
      setNewSector("");
    }
  };

  const handleAddCompany = () => {
    if (newCompany.trim() && !formData.suggestedCompanies.includes(newCompany.trim())) {
      setFormData(prev => ({
        ...prev,
        suggestedCompanies: [...prev.suggestedCompanies, newCompany.trim()]
      }));
      setNewCompany("");
    }
  };

  const handleRemoveSector = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      sectors: prev.sectors.filter(s => s !== sector)
    }));
  };

  const handleRemoveCompany = (company: string) => {
    setFormData(prev => ({
      ...prev,
      suggestedCompanies: prev.suggestedCompanies.filter(c => c !== company)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.dealName.trim()) newErrors.dealName = "Deal name is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = "Valid amount is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (isEditMode) {
        if (selectedDeal) {
          // Update specific deal
          updateDeal(selectedDeal.id, {
            name: formData.dealName,
            accountType: formData.companyName,
            stage: formData.stage as any,
            owner: formData.owner,
            amount: Number(formData.amount),
            remarks: formData.remarks,
          });
        } else {
          // Update existing lead
          updateLead(leadId, {
            name: formData.dealName,
            company: formData.companyName,
            country: formData.country as "India" | "Nepal",
            industry: formData.industry,
            email: formData.contactEmail,
            stage: formData.stage as "New" | "Contacted" | "Qualified",
            owner: formData.owner,
            totalAmount: Number(formData.amount),
            remarks: formData.remarks,
          });
        }
      } else {
        // Create new lead
        const newLead = addLead({
          name: formData.dealName,
          company: formData.companyName,
          country: formData.country as "India" | "Nepal",
          industry: formData.industry,
          email: formData.contactEmail,
          stage: formData.stage as "New" | "Contacted" | "Qualified",
          owner: formData.owner,
          totalDeals: 1,
          totalAmount: Number(formData.amount),
          remarks: formData.remarks,
        });

        // Create the deal
        addDeal({
          leadId: newLead.id,
          name: formData.dealName,
          accountType: formData.companyName,
          stage: formData.stage as any,
          owner: formData.owner,
          amount: Number(formData.amount),
          remarks: formData.remarks,
        });
      }

      // Redirect back to leads page
      router.push("/sales/leads");
    } catch (error) {
      console.error("Error saving deal:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDealSelect = (deal: any) => {
    setSelectedDeal(deal);
    setShowDealsGrid(false);
    setFormData({
      dealName: deal.name,
      companyName: currentLead?.company || "",
      companyDescription: "",
      pocName: "",
      pocPhone: "",
      companyWebsite: "",
      contactEmail: currentLead?.email || "",
      linkedinUrl: "",
      facebookUrl: "",
      instagramUrl: "",
      stage: deal.stage,
      closeDate: "",
      country: currentLead?.country || "India",
      industry: currentLead?.industry || "",
      owner: deal.owner,
      amount: deal.amount.toString(),
      remarks: deal.remarks || "",
      clientPriority: "Medium",
      openToConversation: "Yes",
      sellerStatus: "Verified",
      clientPotential: "One-time project",
      sectors: [],
      suggestedCompanies: [],
    });
  };

  const handleBackToDeals = () => {
    setShowDealsGrid(true);
    setSelectedDeal(null);
  };

  const handleCancel = () => {
    router.push("/sales/leads");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Command Center</span>
            <span>/</span>
            <span>Deals</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {isEditMode ? 'Edit Deal' : 'Create a new deal'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
            </div>
            <div className="flex items-center gap-2">
              <Avatar name="Kamal" />
              <span className="text-sm font-medium">Kamal</span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {showDealsGrid && (
                  <button
                    onClick={handleBackToDeals}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Deals
                  </button>
                )}
                <h1 className="text-2xl font-bold text-gray-900">
                  {showDealsGrid 
                    ? `${currentLead?.name || 'Lead'} - Deals`
                    : isEditMode 
                      ? (selectedDeal ? `Edit ${selectedDeal.name}` : 'Edit Deal')
                      : 'Create a New Deal'
                  }
                </h1>
              </div>
              <Search className="h-5 w-5 text-gray-600" />
            </div>
            <p className="text-gray-600">
              {showDealsGrid 
                ? `Select a deal to edit from ${currentLead?.name || 'this lead'}`
                : isEditMode 
                  ? (selectedDeal ? 'Update the deal information' : 'Update the deal information')
                  : "Here's an overview of your freshly baked deal"
              }
            </p>
          </div>

          {/* Show Deals Grid or Form */}
          {showDealsGrid ? (
            <Card className="p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Available Deals</h2>
                <p className="text-sm text-gray-600">Click on a deal to edit its details</p>
              </div>
              <DealsGrid 
                deals={getDealsByLeadId(leadId)} 
                leadCountry={currentLead?.country || "India"}
                onDealSelect={handleDealSelect}
              />
            </Card>
          ) : (
            <>
              {/* Basic Information Section */}
              <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                <p className="text-sm text-gray-600">Provide context about the deal here</p>
              </div>
              <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                <Edit3 className="h-4 w-4" />
                Edit Section
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Deal Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deal Name *</label>
                <input
                  type="text"
                  value={formData.dealName}
                  onChange={(e) => handleInputChange('dealName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dealName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter deal name..."
                />
                {errors.dealName && <p className="text-red-500 text-xs mt-1">{errors.dealName}</p>}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter company name..."
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
              </div>

              {/* Company Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Company Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                    <textarea
                      value={formData.companyDescription}
                      onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter company description..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">POC's Name</label>
                    <input
                      type="text"
                      value={formData.pocName}
                      onChange={(e) => handleInputChange('pocName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter POC name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">POC's Phone Number</label>
                    <input
                      type="tel"
                      value={formData.pocPhone}
                      onChange={(e) => handleInputChange('pocPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter phone number..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
                    <input
                      type="url"
                      value={formData.companyWebsite}
                      onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email Address *</label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter email address..."
                    />
                    {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
                  </div>
                </div>
              </div>

              {/* Social Media URLs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Facebook URL</label>
                  <input
                    type="url"
                    value={formData.facebookUrl}
                    onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Instagram URL</label>
                  <input
                    type="url"
                    value={formData.instagramUrl}
                    onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>

              {/* Stage, Amount, and Close Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => handleInputChange('stage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {stages.map(stage => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deal Amount *</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.amount ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter amount..."
                    min="0"
                    step="0.01"
                  />
                  {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimate close date</label>
                  <input
                    type="date"
                    value={formData.closeDate}
                    onChange={(e) => handleInputChange('closeDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Additional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter industry..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => handleInputChange('remarks', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any additional remarks..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Deal' : 'Create Deal')}
                </button>
              </div>
            </form>
          </Card>

          {/* Target Preference Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Target Preference</h2>
                <p className="text-sm text-gray-600">Please contact the super administrator to change the buyer's Email Address</p>
              </div>
              <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                <Edit3 className="h-4 w-4" />
                Edit Section
              </button>
            </div>

            <div className="space-y-6">
              {/* Client Niches - Sectors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Client Niches</h3>
                <p className="text-xs text-gray-500 mb-3">Add specific niches or industries this client operates in</p>
                
                {/* Add new sector input */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value)}
                    placeholder="e.g., Spiritual Content, Ashram Management, Cow Shed Marketing..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSector()}
                  />
                  <button
                    type="button"
                    onClick={handleAddSector}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    Add
                  </button>
                </div>

                {/* Display selected sectors */}
                <div className="flex flex-wrap gap-2">
                  {formData.sectors.map((sector) => (
                    <div
                      key={sector}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-full text-xs font-medium"
                    >
                      <span>{sector}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSector(sector)}
                        className="ml-1 hover:text-blue-600 focus:outline-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                {formData.sectors.length === 0 && (
                  <p className="text-xs text-gray-400 italic">No niches added yet. Add specific areas this client works in.</p>
                )}
              </div>

              {/* Related Companies/Accounts */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Related Companies/Accounts</h3>
                <p className="text-xs text-gray-500 mb-3">Add companies, accounts, or brands this client manages</p>
                
                {/* Add new company input */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g., Personal Instagram, Ashram Account, Holy Cow Shed..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCompany()}
                  />
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  >
                    Add
                  </button>
                </div>

                {/* Display selected companies */}
                <div className="flex flex-wrap gap-2">
                  {formData.suggestedCompanies.map((company) => (
                    <div
                      key={company}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 border border-green-200 rounded-full text-xs font-medium"
                    >
                      <span>{company}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCompany(company)}
                        className="ml-1 hover:text-green-600 focus:outline-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                {formData.suggestedCompanies.length === 0 && (
                  <p className="text-xs text-gray-400 italic">No companies/accounts added yet. Add specific accounts this client manages.</p>
                )}
              </div>
            </div>
          </Card>
            </>
          )}
        </div>

        {/* Right Sidebar - Internal Information */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Internal Information</h2>
              <p className="text-sm text-gray-600">This is a short description to inform the admin team that this is confidential information.</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Lead Owner */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead owner</label>
              <Dropdown
                value={formData.owner}
                onChange={(value) => handleInputChange('owner', value)}
                options={owners.map(owner => ({ value: owner, label: owner }))}
                placeholder="Select owner..."
              />
            </div>

            {/* Client Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client priority</label>
              <Dropdown
                value={formData.clientPriority}
                onChange={(value) => handleInputChange('clientPriority', value)}
                options={priorities}
                showInfo={true}
              />
            </div>

            {/* Open to conversation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Open to conversation</label>
              <Dropdown
                value={formData.openToConversation}
                onChange={(value) => handleInputChange('openToConversation', value)}
                options={conversationOptions.map(option => ({ value: option, label: option }))}
                showInfo={true}
              />
            </div>

            {/* Seller status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seller status</label>
              <Dropdown
                value={formData.sellerStatus}
                onChange={(value) => handleInputChange('sellerStatus', value)}
                options={sellerStatuses}
                showInfo={true}
              />
            </div>

            {/* Client Potential */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Potential</label>
              <Dropdown
                value={formData.clientPotential}
                onChange={(value) => handleInputChange('clientPotential', value)}
                options={clientPotentials.map(potential => ({ value: potential, label: potential }))}
                showInfo={true}
              />
            </div>

            {/* Created */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
              <span className="text-sm text-gray-600">{new Date().toLocaleString()}</span>
            </div>

            {/* Updated */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Updated</label>
              <span className="text-sm text-gray-600">{new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
