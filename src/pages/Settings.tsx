import { useEffect, useState } from 'react';
import { Settings as SettingsIcon, RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { dataService } from '@/services/dataService';
import type { PlatformConnection } from '@/types';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<PlatformConnection[]>([]);
  const [syncing, setSyncing] = useState<string | null>(null);

  useEffect(() => {
    const loadConnections = async () => {
      try {
        setLoading(true);
        const data = await dataService.getPlatformConnections();
        setConnections(data);
      } catch (error) {
        console.error('Failed to load connections:', error);
        toast.error('Failed to load platform connections');
      } finally {
        setLoading(false);
      }
    };

    loadConnections();
  }, []);

  const handleSync = async (connectionId: string) => {
    try {
      setSyncing(connectionId);
      await dataService.syncPlatformData(connectionId);
      toast.success('Platform data synced successfully');
      
      const updatedConnections = await dataService.getPlatformConnections();
      setConnections(updatedConnections);
    } catch (error) {
      console.error('Failed to sync:', error);
      toast.error('Failed to sync platform data');
    } finally {
      setSyncing(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-success text-success-foreground">Connected</Badge>;
      case 'error':
        return <Badge className="bg-destructive text-destructive-foreground">Error</Badge>;
      default:
        return <Badge variant="secondary">Disconnected</Badge>;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'shopify':
        return 'Shopify';
      case 'woocommerce':
        return 'WooCommerce';
      case 'amazon':
        return 'Amazon Seller';
      case 'flipkart':
        return 'Flipkart Seller';
      default:
        return platform;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage platform integrations and configurations</p>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage platform integrations and configurations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            E-commerce Platform Integrations
          </CardTitle>
          <CardDescription>
            Connect your e-commerce platforms to automatically sync customer data and enable AI-powered segmentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {connections.map((connection, index) => (
            <div key={connection.id}>
              {index > 0 && <Separator className="my-6" />}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(connection.status)}
                    <div>
                      <h3 className="font-semibold text-lg">{getPlatformName(connection.platform)}</h3>
                      <p className="text-sm text-muted-foreground">
                        Last synced: {new Date(connection.lastSync).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(connection.status)}
                    {connection.status === 'connected' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSync(connection.id)}
                        disabled={syncing === connection.id}
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${syncing === connection.id ? 'animate-spin' : ''}`} />
                        Sync Now
                      </Button>
                    )}
                  </div>
                </div>

                {connection.status === 'connected' && (
                  <div className="grid gap-4 md:grid-cols-2 p-4 rounded-lg bg-muted/50">
                    <div>
                      <Label className="text-xs text-muted-foreground">Store Name</Label>
                      <p className="font-medium">{connection.storeName || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Customers Synced</Label>
                      <p className="font-medium">{connection.customerCount.toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {connection.status === 'disconnected' && (
                  <div className="space-y-4 p-4 rounded-lg border border-dashed">
                    <div className="space-y-2">
                      <Label htmlFor={`${connection.platform}-api-key`}>API Key</Label>
                      <Input
                        id={`${connection.platform}-api-key`}
                        type="password"
                        placeholder="Enter your API key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${connection.platform}-store`}>Store Name / URL</Label>
                      <Input
                        id={`${connection.platform}-store`}
                        placeholder="Enter your store name or URL"
                      />
                    </div>
                    <Button className="w-full">
                      Connect {getPlatformName(connection.platform)}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Configuration</CardTitle>
          <CardDescription>Configure AI models and segmentation parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Sentiment Analysis Model</Label>
              <Input value="BERT (DistilBERT)" disabled />
            </div>
            <div className="space-y-2">
              <Label>Emotion Detection Model</Label>
              <Input value="RoBERTa" disabled />
            </div>
            <div className="space-y-2">
              <Label>Clustering Algorithm</Label>
              <Input value="K-Means (Auto)" disabled />
            </div>
            <div className="space-y-2">
              <Label>Number of Segments</Label>
              <Input value="6-10 (Auto)" disabled />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              AI models are automatically configured for optimal performance. 
              Advanced configuration options are available in the enterprise plan.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Sync Schedule</CardTitle>
          <CardDescription>Configure automatic data synchronization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Sync Frequency</Label>
            <Input value="Every 6 hours" disabled />
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              Automatic synchronization runs every 6 hours to keep your customer data up to date. 
              You can also manually sync at any time using the "Sync Now" button.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
