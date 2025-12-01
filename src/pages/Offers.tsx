import { useState, useEffect } from 'react';
import { Plus, Send, Calendar, TrendingUp, Users, DollarSign, Mail, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { dataService } from '@/services/dataService';
import type { Offer, OfferTemplate, Segment } from '@/types';
import SegmentBadge from '@/components/common/SegmentBadge';

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [templates, setTemplates] = useState<OfferTemplate[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<OfferTemplate | null>(null);

  useEffect(() => {
    loadData();
  }, [selectedStatus]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [offersData, templatesData, segmentsData] = await Promise.all([
        dataService.getOffers(selectedStatus !== 'all' ? { status: selectedStatus } : undefined),
        dataService.getOfferTemplates(),
        dataService.getSegments()
      ]);
      setOffers(offersData);
      setTemplates(templatesData);
      setSegments(segmentsData);
    } catch (error) {
      toast.error('Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOffer = async (offerId: string) => {
    try {
      await dataService.sendOffer(offerId);
      toast.success('Offer sent successfully!');
      loadData();
    } catch (error) {
      toast.error('Failed to send offer');
    }
  };

  const getStatusBadge = (status: Offer['status']) => {
    const variants: Record<Offer['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      draft: { variant: 'secondary', label: 'Draft' },
      active: { variant: 'default', label: 'Active' },
      scheduled: { variant: 'outline', label: 'Scheduled' },
      expired: { variant: 'destructive', label: 'Expired' }
    };
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getOfferTypeIcon = (type: Offer['type']) => {
    const icons = {
      discount: '💰',
      flash_sale: '⚡',
      vip_reward: '👑',
      free_shipping: '📦',
      bundle: '🎁',
      exclusive_access: '🔑'
    };
    return icons[type];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSegmentName = (segmentId: string) => {
    return segments.find(s => s.id === segmentId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Personalized Offers</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage targeted offers for customer segments
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Offer</DialogTitle>
              <DialogDescription>
                Choose a template or create a custom offer for your customer segments
              </DialogDescription>
            </DialogHeader>
            <CreateOfferForm
              templates={templates}
              segments={segments}
              onSuccess={() => {
                setIsCreateDialogOpen(false);
                loadData();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offers.filter(o => o.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {offers.reduce((sum, o) => sum + o.sentCount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Emails delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg. Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(offers.reduce((sum, o) => sum + o.conversionRate, 0) / offers.length * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all offers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${offers.reduce((sum, o) => sum + o.revenue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Generated from offers</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
        <TabsList>
          <TabsTrigger value="all">All Offers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus} className="space-y-4 mt-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-2 text-muted-foreground">Loading offers...</p>
            </div>
          ) : offers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No offers found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {offers.map((offer) => (
                <Card key={offer.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{getOfferTypeIcon(offer.type)}</div>
                        <div>
                          <CardTitle className="text-lg">{offer.title}</CardTitle>
                          <CardDescription className="mt-1">{offer.description}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(offer.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {offer.segmentIds.map((segmentId) => {
                        const segment = segments.find(s => s.id === segmentId);
                        return segment ? (
                          <SegmentBadge key={segmentId} name={segment.name} color={segment.color} />
                        ) : null;
                      })}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Discount</div>
                        <div className="text-lg font-semibold">
                          {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `$${offer.discountValue}`} OFF
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Target Customers</div>
                        <div className="text-lg font-semibold flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {offer.targetCustomers.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          Sent
                        </div>
                        <div className="font-medium">{offer.sentCount.toLocaleString()}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          Open Rate
                        </div>
                        <div className="font-medium">{(offer.openRate * 100).toFixed(1)}%</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Conversion
                        </div>
                        <div className="font-medium">{(offer.conversionRate * 100).toFixed(1)}%</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          Revenue
                        </div>
                        <div className="font-medium">${offer.revenue.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(offer.validFrom)} - {formatDate(offer.validUntil)}
                      </div>
                      {offer.status === 'draft' && (
                        <Button size="sm" onClick={() => handleSendOffer(offer.id)}>
                          <Send className="h-3 w-3 mr-1" />
                          Send
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Offer Templates</CardTitle>
          <CardDescription>
            Pre-built templates optimized for each customer segment's psychology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedTemplate(template)}>
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {template.recommendedSegments.map((segmentId) => {
                      const segment = segments.find(s => s.id === segmentId);
                      return segment ? (
                        <SegmentBadge key={segmentId} name={segment.name} color={segment.color} />
                      ) : null;
                    })}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {template.psychologyTriggers.map((trigger) => (
                      <Badge key={trigger} variant="outline" className="text-xs">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium">
                      Default: {template.discountType === 'percentage' ? `${template.defaultDiscount}%` : `$${template.defaultDiscount}`} OFF
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CreateOfferForm({
  templates,
  segments,
  onSuccess
}: {
  templates: OfferTemplate[];
  segments: Segment[];
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'discount' as Offer['type'],
    segmentIds: [] as string[],
    discountValue: 10,
    discountType: 'percentage' as 'percentage' | 'fixed',
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft' as Offer['status'],
    targetCustomers: 0
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setFormData({
        ...formData,
        title: template.name,
        description: template.description,
        type: template.type,
        segmentIds: template.recommendedSegments,
        discountValue: template.defaultDiscount,
        discountType: template.discountType,
        targetCustomers: template.recommendedSegments.reduce((sum, segId) => {
          const seg = segments.find(s => s.id === segId);
          return sum + (seg?.customerCount || 0);
        }, 0)
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dataService.createOffer(formData);
      toast.success('Offer created successfully!');
      onSuccess();
    } catch (error) {
      toast.error('Failed to create offer');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Use Template (Optional)</Label>
        <Select onValueChange={handleTemplateSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Offer Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Offer Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as Offer['type'] })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discount">Discount</SelectItem>
              <SelectItem value="flash_sale">Flash Sale</SelectItem>
              <SelectItem value="vip_reward">VIP Reward</SelectItem>
              <SelectItem value="free_shipping">Free Shipping</SelectItem>
              <SelectItem value="bundle">Bundle</SelectItem>
              <SelectItem value="exclusive_access">Exclusive Access</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountType">Discount Type *</Label>
          <Select value={formData.discountType} onValueChange={(value) => setFormData({ ...formData, discountType: value as 'percentage' | 'fixed' })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage (%)</SelectItem>
              <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="discountValue">Discount Value *</Label>
        <Input
          id="discountValue"
          type="number"
          value={formData.discountValue}
          onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="validFrom">Valid From *</Label>
          <Input
            id="validFrom"
            type="date"
            value={formData.validFrom}
            onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="validUntil">Valid Until *</Label>
          <Input
            id="validUntil"
            type="date"
            value={formData.validUntil}
            onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit">Create Offer</Button>
      </div>
    </form>
  );
}
