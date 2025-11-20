"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockInvoices } from "@/lib/mock-data"
import { DollarSign, Download, Printer, Send } from "lucide-react"

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Finance & Accounting</h1>
        <p className="text-muted-foreground mt-1">Billing statements and invoice management</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue (Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$9,700.00</p>
            <p className="text-xs text-muted-foreground mt-1">From {mockInvoices.length} invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-secondary">
              $
              {mockInvoices
                .filter((i) => i.status === "Pending")
                .reduce((sum, i) => sum + i.amount, 0)
                .toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {mockInvoices.filter((i) => i.status === "Pending").length} invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              $
              {mockInvoices
                .filter((i) => i.status === "Paid")
                .reduce((sum, i) => sum + i.amount, 0)
                .toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {mockInvoices.filter((i) => i.status === "Paid").length} invoices
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices */}
      <div className="space-y-4">
        {mockInvoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Invoice {invoice.id}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Patient: {invoice.patientName} • Issued: {invoice.date}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold">${invoice.amount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Due: {invoice.dueDate}</p>
                  </div>
                  <Badge
                    variant={
                      invoice.status === "Paid" ? "default" : invoice.status === "Pending" ? "secondary" : "destructive"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Invoice Items</p>
                  <div className="space-y-2">
                    {invoice.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.description}</span>
                        <span className="font-medium">${item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Printer className="w-4 h-4" />
                    Print
                  </Button>
                  {invoice.status === "Pending" && (
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Send className="w-4 h-4" />
                      Send Reminder
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed border-2">
        <CardContent className="pt-6">
          <p className="text-sm text-center text-muted-foreground">
            <strong>Prototype Feature:</strong> All financial data is mock data for demonstration purposes.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
