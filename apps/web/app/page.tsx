"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-50 to-blue-100">
      <div className="mx-auto max-w-2xl py-24">
        <h1 className="text-4xl font-bold mb-4 text-blue-800">Internal Operating System — PMS</h1>
        <p className="mb-8 text-lg text-gray-700">Central Operating System for Marketing & Sales — Modular, Role-based, Real Time.</p>
        <nav className="grid gap-3 sm:grid-cols-2">
          <Link href="/sales/leads" className="block py-3 px-4 rounded-lg bg-white shadow hover:bg-blue-50 border border-blue-100 font-semibold">Sales CRM</Link>
          <Link href="/marketing/projects" className="block py-3 px-4 rounded-lg bg-white shadow hover:bg-blue-50 border border-blue-100 font-semibold">Marketing Dashboard</Link>
          <Link href="/design/my-week" className="block py-3 px-4 rounded-lg bg-white shadow hover:bg-blue-50 border border-blue-100 font-semibold">Design Management</Link>
          <Link href="/marketing/board" className="block py-3 px-4 rounded-lg bg-white shadow hover:bg-blue-50 border border-blue-100 font-semibold">Content Kanban</Link>
          <Link href="/sales/deals" className="block py-3 px-4 rounded-lg bg-white shadow hover:bg-blue-50 border border-blue-100 font-semibold">Deals Board</Link>
          <Link href="/founders/dashboard" className="block py-3 px-4 rounded-lg bg-white shadow hover:bg-blue-50 border border-blue-100 font-semibold">Founders’ Command Center</Link>
        </nav>
        <div className="mt-8 text-md text-gray-600 border-t pt-6">
          To get started, select your persona above. All flows and dashboards are customizable per role. For design, plug in Figma links for each module.
        </div>
      </div>
    </main>
  );
}
