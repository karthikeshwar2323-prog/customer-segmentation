import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Users, TrendingUp, CheckCircle, AlertCircle, Download, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import type { Customer } from '@/types';

interface CSVRow {
  [key: string]: string;
}

interface UploadStats {
  totalRows: number;
  successfulRows: number;
  failedRows: number;
  newCustomers: number;
  segmentsGenerated: number;
}

interface SegmentDistribution {
  id: string;
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export default function DataImport() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStats, setUploadStats] = useState<UploadStats | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<CSVRow[]>([]);
  const [uploadedCustomers, setUploadedCustomers] = useState<Customer[]>([]);
  const [generating, setGenerating] = useState(false);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const [segmentDistribution, setSegmentDistribution] = useState<SegmentDistribution[]>([]);

  const downloadTemplate = () => {
    const template = `customer_id,name,email,total_spent,order_count,last_order_date,avg_order_value,churn_risk,sentiment_score,personality_openness,personality_conscientiousness,personality_extraversion,personality_agreeableness,personality_neuroticism
CUST001,John Doe,john@example.com,5420,12,2024-11-15,451.67,low,0.85,0.75,0.82,0.68,0.79,0.35
CUST002,Jane Smith,jane@example.com,890,3,2024-10-20,296.67,high,0.45,0.62,0.71,0.55,0.68,0.72
CUST003,Bob Johnson,bob@example.com,15600,28,2024-11-28,557.14,low,0.92,0.88,0.85,0.79,0.91,0.28`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer_data_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('Template downloaded successfully');
  };

  const parseCSV = (text: string): CSVRow[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim());
    const rows: CSVRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length === headers.length) {
        const row: CSVRow = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });
        rows.push(row);
      }
    }

    return rows;
  };

  const validateRow = (row: CSVRow): string | null => {
    const requiredFields = ['customer_id', 'name', 'email', 'total_spent', 'order_count'];
    
    for (const field of requiredFields) {
      if (!row[field]) {
        return `Missing required field: ${field}`;
      }
    }

    if (isNaN(Number(row.total_spent))) {
      return 'Invalid total_spent value';
    }

    if (isNaN(Number(row.order_count))) {
      return 'Invalid order_count value';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(row.email)) {
      return 'Invalid email format';
    }

    return null;
  };

  const generateSegmentFromCustomer = (customer: Customer): string => {
    const totalSpent = customer.totalSpent;
    const orderCount = customer.orderCount;
    const churnRisk = customer.churnRisk;
    const isNegativeSentiment = customer.sentiment === 'negative';

    if (totalSpent > 10000 && orderCount > 20) {
      return 'seg-5';
    }

    if (churnRisk > 0.7 || isNegativeSentiment) {
      return 'seg-6';
    }

    if (orderCount > 15 && churnRisk < 0.3) {
      return 'seg-3';
    }

    if (orderCount < 5 && totalSpent < 1000) {
      return 'seg-4';
    }

    if (totalSpent < 2000 || isNegativeSentiment) {
      return 'seg-2';
    }

    return 'seg-1';
  };

  const csvRowToCustomer = (row: CSVRow): Customer => {
    const totalSpent = Number(row.total_spent);
    const orderCount = Number(row.order_count);
    const avgOrderValue = row.avg_order_value ? Number(row.avg_order_value) : totalSpent / orderCount;
    const sentimentScore = row.sentiment_score ? Number(row.sentiment_score) : 0.7;
    const churnRiskValue = row.churn_risk === 'high' ? 0.8 : row.churn_risk === 'medium' ? 0.5 : 0.2;

    const customer: Customer = {
      id: row.customer_id,
      name: row.name,
      email: row.email,
      platform: 'shopify',
      totalSpent,
      orderCount,
      lastOrderDate: row.last_order_date || new Date().toISOString().split('T')[0],
      firstOrderDate: row.first_order_date || '2023-01-01',
      averageOrderValue: avgOrderValue,
      churnRisk: churnRiskValue,
      lifetimeValue: totalSpent * 1.5,
      segmentId: '',
      sentiment: sentimentScore > 0.6 ? 'positive' : sentimentScore < 0.4 ? 'negative' : 'neutral',
      emotions: {
        joy: row.emotion_joy ? Number(row.emotion_joy) : 0.7,
        anger: row.emotion_anger ? Number(row.emotion_anger) : 0.1,
        sadness: row.emotion_sadness ? Number(row.emotion_sadness) : 0.1,
        fear: row.emotion_fear ? Number(row.emotion_fear) : 0.2,
        surprise: row.emotion_surprise ? Number(row.emotion_surprise) : 0.3
      },
      personality: {
        openness: row.personality_openness ? Number(row.personality_openness) : 0.7,
        conscientiousness: row.personality_conscientiousness ? Number(row.personality_conscientiousness) : 0.7,
        extraversion: row.personality_extraversion ? Number(row.personality_extraversion) : 0.6,
        agreeableness: row.personality_agreeableness ? Number(row.personality_agreeableness) : 0.7,
        neuroticism: row.personality_neuroticism ? Number(row.personality_neuroticism) : 0.4
      },
      rfmScore: {
        recency: 5,
        frequency: Math.min(5, Math.ceil(orderCount / 5)),
        monetary: Math.min(5, Math.ceil(totalSpent / 5000)),
        total: 0
      },
      tags: []
    };

    customer.rfmScore.total = customer.rfmScore.recency + customer.rfmScore.frequency + customer.rfmScore.monetary;
    customer.segmentId = generateSegmentFromCustomer(customer);
    return customer;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setProgress(0);
    setErrors([]);
    setUploadStats(null);
    setSegmentDistribution([]);

    try {
      const text = await file.text();
      setProgress(20);

      const rows = parseCSV(text);
      if (rows.length === 0) {
        throw new Error('No valid data found in CSV file');
      }

      setPreviewData(rows.slice(0, 5));
      setProgress(40);

      const validationErrors: string[] = [];
      const customers: Customer[] = [];

      rows.forEach((row, index) => {
        const error = validateRow(row);
        if (error) {
          validationErrors.push(`Row ${index + 2}: ${error}`);
        } else {
          try {
            const customer = csvRowToCustomer(row);
            customers.push(customer);
          } catch (err) {
            validationErrors.push(`Row ${index + 2}: Failed to process customer data`);
          }
        }
      });

      setProgress(80);

      const stats: UploadStats = {
        totalRows: rows.length,
        successfulRows: customers.length,
        failedRows: validationErrors.length,
        newCustomers: customers.length,
        segmentsGenerated: 0
      };

      setUploadedCustomers(customers);
      setUploadStats(stats);
      setErrors(validationErrors.slice(0, 10));
      setProgress(100);

      if (customers.length > 0) {
        toast.success(`Successfully imported ${customers.length} customers`);
      }

      if (validationErrors.length > 0) {
        toast.warning(`${validationErrors.length} rows had errors`);
      }

    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process CSV file');
      setErrors([error instanceof Error ? error.message : 'Unknown error']);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const generateSegmentsForUploadedData = async () => {
    if (uploadedCustomers.length === 0) {
      toast.error('No customer data to segment');
      return;
    }

    setGenerating(true);
    setSegmentProgress(0);
    setSegmentDistribution([]);

    toast.info('Starting segment generation for uploaded customers...');

    const steps = [
      { progress: 20, message: 'Analyzing customer data...' },
      { progress: 40, message: 'Calculating RFM scores...' },
      { progress: 60, message: 'Processing emotional profiles...' },
      { progress: 80, message: 'Applying clustering algorithms...' },
      { progress: 100, message: 'Finalizing segments...' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSegmentProgress(step.progress);
      toast.info(step.message);
    }

    const segmentMap: { [key: string]: { name: string; color: string; customers: Customer[] } } = {
      'seg-1': { name: 'Impulsive Emotional Buyers', color: 'bg-primary', customers: [] },
      'seg-2': { name: 'Price-Sensitive Anxious Buyers', color: 'bg-chart-4', customers: [] },
      'seg-3': { name: 'Brand-Loyal Confident Buyers', color: 'bg-chart-2', customers: [] },
      'seg-4': { name: 'Curious Browsers', color: 'bg-chart-3', customers: [] },
      'seg-5': { name: 'Luxury Seekers', color: 'bg-chart-5', customers: [] },
      'seg-6': { name: 'At-Risk Customers', color: 'bg-destructive', customers: [] }
    };

    uploadedCustomers.forEach(customer => {
      const segmentId = generateSegmentFromCustomer(customer);
      if (segmentMap[segmentId]) {
        segmentMap[segmentId].customers.push(customer);
      }
    });

    const distribution: SegmentDistribution[] = Object.entries(segmentMap)
      .map(([id, data]) => ({
        id,
        name: data.name,
        count: data.customers.length,
        percentage: (data.customers.length / uploadedCustomers.length) * 100,
        color: data.color
      }))
      .filter(seg => seg.count > 0)
      .sort((a, b) => b.count - a.count);

    setSegmentDistribution(distribution);

    if (uploadStats) {
      setUploadStats({
        ...uploadStats,
        segmentsGenerated: distribution.length
      });
    }

    setGenerating(false);
    toast.success(`Successfully generated ${distribution.length} segments for ${uploadedCustomers.length} customers!`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Import Customer Data</h1>
        <p className="text-muted-foreground">
          Upload customer data from CSV files to add new customers to your database
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upload CSV File</CardTitle>
            <CardDescription>
              Import customer data from CSV file. Maximum file size: 5MB
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Choose CSV File</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a CSV file with customer data
                  </p>
                </div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  id="csv-upload"
                />
                <label htmlFor="csv-upload">
                  <Button asChild disabled={uploading}>
                    <span className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Select File'}
                    </span>
                  </Button>
                </label>
              </div>
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Processing...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            {uploadStats && (
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{uploadStats.newCustomers}</p>
                        <p className="text-sm text-muted-foreground">Customers Imported</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-success/10 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{uploadStats.segmentsGenerated}</p>
                        <p className="text-sm text-muted-foreground">Segments Assigned</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-success/10 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{uploadStats.successfulRows}</p>
                        <p className="text-sm text-muted-foreground">Successful Rows</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-destructive/10 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{uploadStats.failedRows}</p>
                        <p className="text-sm text-muted-foreground">Failed Rows</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {uploadStats && uploadedCustomers.length > 0 && (
              <div className="space-y-4">
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription>
                    Generate intelligent segments for the {uploadedCustomers.length} uploaded customers using AI analysis.
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={generateSegmentsForUploadedData} 
                  disabled={generating}
                  className="w-full"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {generating ? 'Generating Segments...' : 'Generate Segments for Uploaded Data'}
                </Button>

                {generating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Generating segments...</span>
                      <span>{segmentProgress}%</span>
                    </div>
                    <Progress value={segmentProgress} />
                  </div>
                )}

                {segmentDistribution.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Segment Distribution</CardTitle>
                      <CardDescription>
                        Distribution of {uploadedCustomers.length} uploaded customers across {segmentDistribution.length} segments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {segmentDistribution.map((segment) => (
                          <div key={segment.id} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">{segment.name}</span>
                              <span className="text-muted-foreground">
                                {segment.count} ({segment.percentage.toFixed(1)}%)
                              </span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className={`h-full ${segment.color}`}
                                style={{ width: `${segment.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {errors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-semibold mb-2">Validation Errors:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                  {errors.length === 10 && (
                    <p className="text-sm mt-2 italic">Showing first 10 errors...</p>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {previewData.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Data Preview (First 5 Rows)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        {Object.keys(previewData[0]).slice(0, 5).map((key) => (
                          <th key={key} className="text-left p-2 font-semibold">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, index) => (
                        <tr key={index} className="border-b border-border/50">
                          {Object.values(row).slice(0, 5).map((value, i) => (
                            <td key={i} className="p-2 text-muted-foreground">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CSV Template</CardTitle>
              <CardDescription>
                Download a template to see the required format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={downloadTemplate} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Required Fields</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <span><strong>customer_id</strong> - Unique identifier</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <span><strong>name</strong> - Customer name</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <span><strong>email</strong> - Valid email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <span><strong>total_spent</strong> - Total amount spent</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <span><strong>order_count</strong> - Number of orders</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optional Fields</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• last_order_date</li>
                <li>• avg_order_value</li>
                <li>• churn_risk (low/medium/high)</li>
                <li>• sentiment_score (0-1)</li>
                <li>• personality traits (0-1)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                After importing customers, you can:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
                  <span>Generate segments from imported data</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-primary mt-0.5" />
                  <span>View customers in the Customers page</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                  <span>Create targeted offers and campaigns</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
