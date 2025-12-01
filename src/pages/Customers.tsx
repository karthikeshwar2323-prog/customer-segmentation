import { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SegmentBadge from '@/components/common/SegmentBadge';
import { dataService } from '@/services/dataService';
import type { Customer, Segment } from '@/types';

export default function Customers() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    segment: '',
    platform: '',
    sentiment: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [segmentsData] = await Promise.all([
          dataService.getSegments()
        ]);
        setSegments(segmentsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await dataService.getCustomers({
          search: filters.search || undefined,
          segment: filters.segment || undefined,
          platform: filters.platform || undefined,
          sentiment: filters.sentiment || undefined
        });
        setCustomers(data);
      } catch (error) {
        console.error('Failed to load customers:', error);
      }
    };

    const debounce = setTimeout(() => {
      loadCustomers();
    }, 300);

    return () => clearTimeout(debounce);
  }, [filters]);

  const getSegment = (segmentId: string) => {
    return segments.find(s => s.id === segmentId);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-success text-success-foreground';
      case 'negative':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground mt-2">Manage and analyze customer data</p>
        </div>
        <Skeleton className="h-96 bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground mt-2">Manage and analyze customer data</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col xl:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name or email..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filters.segment} onValueChange={(value) => setFilters({ ...filters, segment: value })}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Segments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  {segments.map(segment => (
                    <SelectItem key={segment.id} value={segment.id}>
                      {segment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.platform} onValueChange={(value) => setFilters({ ...filters, platform: value })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="shopify">Shopify</SelectItem>
                  <SelectItem value="woocommerce">WooCommerce</SelectItem>
                  <SelectItem value="amazon">Amazon</SelectItem>
                  <SelectItem value="flipkart">Flipkart</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.sentiment} onValueChange={(value) => setFilters({ ...filters, sentiment: value })}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Sentiments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sentiments</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>

              {(filters.search || filters.segment || filters.platform || filters.sentiment) && (
                <Button
                  variant="outline"
                  onClick={() => setFilters({ search: '', segment: '', platform: '', sentiment: '' })}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead className="text-right">RFM Score</TableHead>
                  <TableHead className="text-right">Churn Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  customers.map((customer) => {
                    const segment = getSegment(customer.segmentId);
                    return (
                      <TableRow key={customer.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-muted-foreground">{customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {customer.platform}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {segment && (
                            <SegmentBadge name={segment.name} color={segment.color} />
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getSentimentColor(customer.sentiment)}>
                            {customer.sentiment}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{customer.orderCount}</TableCell>
                        <TableCell className="text-right font-medium">
                          ${customer.totalSpent.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary">{customer.rfmScore.total}/15</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge 
                            className={
                              customer.churnRisk > 0.7 
                                ? 'bg-destructive text-destructive-foreground' 
                                : customer.churnRisk > 0.4 
                                ? 'bg-warning text-warning-foreground' 
                                : 'bg-success text-success-foreground'
                            }
                          >
                            {(customer.churnRisk * 100).toFixed(0)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {customers.length} customers
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
