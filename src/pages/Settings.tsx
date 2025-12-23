import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe,
  Eye,
  EyeOff,
  Camera,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [isCreator, setIsCreator] = useState(false);
  
  // Account settings
  const [username, setUsername] = useState("cryptotrader2024");
  const [email, setEmail] = useState("user@example.com");
  const [bio, setBio] = useState("Prediction market enthusiast. Crypto & Politics specialist.");
  
  // Creator settings
  const [displayName, setDisplayName] = useState("");
  const [creatorBio, setCreatorBio] = useState("");
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    marketResolution: true,
    priceAlerts: true,
    newFollowers: true,
    marketUpdates: false,
    newsletter: false,
    promotions: false,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    showPortfolio: true,
    showPositions: false,
    showActivity: true,
    publicProfile: true,
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6">
        <PageHeader 
          title="Settings" 
          subtitle="Manage your account preferences and privacy"
        />

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 flex-wrap h-auto gap-1">
            <TabsTrigger value="account" className="data-[state=active]:bg-background gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-background gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-background gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-background gap-2">
              <CreditCard className="h-4 w-4" />
              Payment
            </TabsTrigger>
            {isCreator && (
              <TabsTrigger value="creator" className="data-[state=active]:bg-background gap-2">
                <Globe className="h-4 w-4" />
                Creator Profile
              </TabsTrigger>
            )}
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile photo</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell others about yourself..."
                    className="resize-none"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Language & Region</CardTitle>
                <CardDescription>Set your preferred language and timezone</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="cet">Central European</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="gap-2">
                <Check className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Trading Notifications</CardTitle>
                <CardDescription>Get notified about your trading activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Market Resolution</p>
                    <p className="text-sm text-muted-foreground">When a market you're in resolves</p>
                  </div>
                  <Switch 
                    checked={notifications.marketResolution}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketResolution: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Price Alerts</p>
                    <p className="text-sm text-muted-foreground">When prices move significantly</p>
                  </div>
                  <Switch 
                    checked={notifications.priceAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, priceAlerts: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Followers</p>
                    <p className="text-sm text-muted-foreground">When someone follows you</p>
                  </div>
                  <Switch 
                    checked={notifications.newFollowers}
                    onCheckedChange={(checked) => setNotifications({...notifications, newFollowers: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Market Updates</p>
                    <p className="text-sm text-muted-foreground">News about markets you follow</p>
                  </div>
                  <Switch 
                    checked={notifications.marketUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketUpdates: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Marketing</CardTitle>
                <CardDescription>Promotional communications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-muted-foreground">Weekly market insights and tips</p>
                  </div>
                  <Switch 
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => setNotifications({...notifications, newsletter: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promotions</p>
                    <p className="text-sm text-muted-foreground">Special offers and bonuses</p>
                  </div>
                  <Switch 
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => setNotifications({...notifications, promotions: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="gap-2">
                <Check className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Profile Visibility</CardTitle>
                <CardDescription>Control what others can see about you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {privacy.publicProfile ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                    <div>
                      <p className="font-medium">Public Profile</p>
                      <p className="text-sm text-muted-foreground">Allow anyone to view your profile</p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.publicProfile}
                    onCheckedChange={(checked) => setPrivacy({...privacy, publicProfile: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {privacy.showPortfolio ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                    <div>
                      <p className="font-medium">Show Portfolio Value</p>
                      <p className="text-sm text-muted-foreground">Display your total portfolio value</p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.showPortfolio}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showPortfolio: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {privacy.showPositions ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                    <div>
                      <p className="font-medium">Show Active Positions</p>
                      <p className="text-sm text-muted-foreground">Let others see your current trades</p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.showPositions}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showPositions: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {privacy.showActivity ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                    <div>
                      <p className="font-medium">Show Activity Feed</p>
                      <p className="text-sm text-muted-foreground">Display your recent activity</p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.showActivity}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showActivity: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 border-destructive/30">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" size="sm">Delete Account</Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="gap-2">
                <Check className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your deposit and withdrawal options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/26</p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  + Add Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Withdrawal Settings</CardTitle>
                <CardDescription>Set up your withdrawal preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Withdrawal Method</Label>
                  <Select defaultValue="bank">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creator Profile Settings (only shown if user is a creator) */}
          {isCreator && (
            <TabsContent value="creator" className="space-y-6">
              <Card className="border-border/40">
                <CardHeader>
                  <CardTitle>Creator Profile</CardTitle>
                  <CardDescription>Customize your public creator page</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input 
                      id="displayName" 
                      value={displayName} 
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your public display name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creatorBio">Creator Bio</Label>
                    <Textarea 
                      id="creatorBio" 
                      value={creatorBio} 
                      onChange={(e) => setCreatorBio(e.target.value)}
                      placeholder="Tell your audience about your expertise..."
                      className="resize-none"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="gap-2">
                  <Check className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
