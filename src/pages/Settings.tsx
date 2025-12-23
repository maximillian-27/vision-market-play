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
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <PageHeader 
          title="Settings" 
          subtitle="Manage your account preferences and privacy"
        />

        <Tabs defaultValue="account" className="space-y-4 sm:space-y-6">
          {/* Horizontal scrolling tabs for mobile */}
          <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-hide">
            <TabsList className="bg-muted/50 p-1 w-max sm:w-auto">
              <TabsTrigger value="account" className="data-[state=active]:bg-background gap-1.5 text-xs sm:text-sm px-2.5 sm:px-3">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-background gap-1.5 text-xs sm:text-sm px-2.5 sm:px-3">
                <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-background gap-1.5 text-xs sm:text-sm px-2.5 sm:px-3">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-background gap-1.5 text-xs sm:text-sm px-2.5 sm:px-3">
                <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:inline">Payment</span>
              </TabsTrigger>
              {isCreator && (
                <TabsTrigger value="creator" className="data-[state=active]:bg-background gap-1.5 text-xs sm:text-sm px-2.5 sm:px-3">
                  <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline sm:inline">Creator</span>
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-4 sm:space-y-6">
            <Card className="border-border/40">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Profile Picture</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Update your profile photo</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 flex items-center gap-4 sm:gap-6">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="space-y-1.5 sm:space-y-2">
                  <Button variant="outline" size="sm" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Change Photo
                  </Button>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Account Information</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="username" className="text-xs sm:text-sm">Username</Label>
                    <Input 
                      id="username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="bio" className="text-xs sm:text-sm">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell others about yourself..."
                    className="resize-none text-sm"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Language & Region</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Set your preferred language and timezone</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="h-9 sm:h-10 text-sm">
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
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger className="h-9 sm:h-10 text-sm">
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
              <Button onClick={handleSave} size="sm" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4 sm:space-y-6">
            <Card className="border-border/40">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Trading Notifications</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Get notified about your trading activity</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Market Resolution</p>
                    <p className="text-xs text-muted-foreground truncate">When a market you're in resolves</p>
                  </div>
                  <Switch 
                    checked={notifications.marketResolution}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketResolution: checked})}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Price Alerts</p>
                    <p className="text-xs text-muted-foreground truncate">When prices move significantly</p>
                  </div>
                  <Switch 
                    checked={notifications.priceAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, priceAlerts: checked})}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm">New Followers</p>
                    <p className="text-xs text-muted-foreground truncate">When someone follows you</p>
                  </div>
                  <Switch 
                    checked={notifications.newFollowers}
                    onCheckedChange={(checked) => setNotifications({...notifications, newFollowers: checked})}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Market Updates</p>
                    <p className="text-xs text-muted-foreground truncate">News about markets you follow</p>
                  </div>
                  <Switch 
                    checked={notifications.marketUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketUpdates: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Marketing</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Promotional communications</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Newsletter</p>
                    <p className="text-xs text-muted-foreground truncate">Weekly market insights and tips</p>
                  </div>
                  <Switch 
                    checked={notifications.newsletter}
                    onCheckedChange={(checked) => setNotifications({...notifications, newsletter: checked})}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Promotions</p>
                    <p className="text-xs text-muted-foreground truncate">Special offers and bonuses</p>
                  </div>
                  <Switch 
                    checked={notifications.promotions}
                    onCheckedChange={(checked) => setNotifications({...notifications, promotions: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} size="sm" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-4 sm:space-y-6">
            <Card className="border-border/40">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Profile Visibility</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Control what others can see about you</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    {privacy.publicProfile ? <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <EyeOff className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    <div className="min-w-0">
                      <p className="font-medium text-sm">Public Profile</p>
                      <p className="text-xs text-muted-foreground truncate">Allow anyone to view your profile</p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.publicProfile}
                    onCheckedChange={(checked) => setPrivacy({...privacy, publicProfile: checked})}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    {privacy.showPortfolio ? <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <EyeOff className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    <div className="min-w-0">
                      <p className="font-medium text-sm">Show Portfolio Value</p>
                      <p className="text-xs text-muted-foreground truncate">Display your total portfolio value</p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.showPortfolio}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showPortfolio: checked})}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    {privacy.showPositions ? <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <EyeOff className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    <div className="min-w-0">
                      <p className="font-medium text-sm">Show Active Positions</p>
                      <p className="text-xs text-muted-foreground truncate">Let others see your current trades</p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.showPositions}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showPositions: checked})}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    {privacy.showActivity ? <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <EyeOff className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    <div className="min-w-0">
                      <p className="font-medium text-sm">Show Activity Feed</p>
                      <p className="text-xs text-muted-foreground truncate">Display your recent activity</p>
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
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <CardTitle className="text-destructive text-base sm:text-lg">Danger Zone</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Delete Account</p>
                    <p className="text-xs text-muted-foreground truncate">Permanently delete your account</p>
                  </div>
                  <Button variant="destructive" size="sm" className="text-xs flex-shrink-0">Delete</Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} size="sm" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-4 sm:space-y-6">
            <Card className="border-border/40">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Payment Methods</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Manage your deposit and withdrawal options</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-border/40 bg-muted/20 gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="h-8 w-12 sm:h-10 sm:w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0">
                      VISA
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">•••• 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/26</p>
                    </div>
                  </div>
                  <Badge className="text-[10px] sm:text-xs flex-shrink-0">Default</Badge>
                </div>
                <Button variant="outline" className="w-full text-xs sm:text-sm h-9 sm:h-10">
                  + Add Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Withdrawal Settings</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Set up your withdrawal preferences</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-3 sm:space-y-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-xs sm:text-sm">Default Withdrawal Method</Label>
                  <Select defaultValue="bank">
                    <SelectTrigger className="h-9 sm:h-10 text-sm">
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
            <TabsContent value="creator" className="space-y-4 sm:space-y-6">
              <Card className="border-border/40">
                <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Creator Profile</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Customize your public creator page</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-3 sm:space-y-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="displayName" className="text-xs sm:text-sm">Display Name</Label>
                    <Input 
                      id="displayName" 
                      value={displayName} 
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your public display name"
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="creatorBio" className="text-xs sm:text-sm">Creator Bio</Label>
                    <Textarea 
                      id="creatorBio" 
                      value={creatorBio} 
                      onChange={(e) => setCreatorBio(e.target.value)}
                      placeholder="Tell your audience about your expertise..."
                      className="resize-none text-sm"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSave} size="sm" className="gap-1.5 sm:gap-2 text-xs sm:text-sm">
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
