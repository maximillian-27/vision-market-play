import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Check,
  Lock,
  Smartphone,
  Timer,
  Ticket,
  AlertTriangle,
  Wallet,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
    oddsChanges: true,
    drawResults: true,
    entryConfirmations: true,
    newFollowers: true,
    marketUpdates: false,
    newsletter: false,
    promotions: false,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    showWinnings: true,
    showEntries: false,
    showActivity: true,
    publicProfile: true,
  });

  // Security settings
  const [security, setSecurity] = useState({
    twoFactor: false,
  });

  // Responsible gambling settings
  const [responsible, setResponsible] = useState({
    dailyLimit: "",
    weeklyLimit: "",
    sessionReminder: false,
    reminderInterval: "1hr",
  });

  // Preferences
  const [preferences, setPreferences] = useState({
    oddsFormat: "percentage",
    defaultTickets: "1",
  });

  // Crypto wallet
  const [cryptoWallet, setCryptoWallet] = useState("");

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        <div className="hidden sm:block">
          <PageHeader 
            title="Settings" 
            subtitle="Manage your account preferences and privacy"
          />
        </div>

        <Tabs defaultValue="account" className="space-y-4 sm:space-y-6">
          {/* Horizontal scrolling tabs for mobile */}
          <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-hide">
            <TabsList className="bg-muted/50 p-1 w-max sm:w-auto">
              <TabsTrigger value="account" className="data-[state=active]:bg-background gap-1 sm:gap-1.5 text-[11px] sm:text-sm px-2 sm:px-3">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-background gap-1 sm:gap-1.5 text-[11px] sm:text-sm px-2 sm:px-3">
                <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-background gap-1 sm:gap-1.5 text-[11px] sm:text-sm px-2 sm:px-3">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-background gap-1 sm:gap-1.5 text-[11px] sm:text-sm px-2 sm:px-3">
                <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Payment</span>
              </TabsTrigger>
              {isCreator && (
                <TabsTrigger value="creator" className="data-[state=active]:bg-background gap-1 sm:gap-1.5 text-[11px] sm:text-sm px-2 sm:px-3">
                  <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Creator</span>
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

            {/* Security */}
            <Card className="border-border/40">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base sm:text-lg">Security</CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm">Protect your account</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <Smartphone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">Two-Factor Authentication</p>
                        <Badge variant={security.twoFactor ? "default" : "secondary"} className="text-[9px] px-1.5 py-0">
                          {security.twoFactor ? "On" : "Off"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Switch 
                    checked={security.twoFactor}
                    onCheckedChange={(checked) => setSecurity({...security, twoFactor: checked})}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Change Password</p>
                    <p className="text-xs text-muted-foreground truncate">Update your account password</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs flex-shrink-0">Change</Button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Active Sessions</p>
                    <p className="text-xs text-muted-foreground truncate">Last login: Chrome on macOS · 2 hours ago</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground flex-shrink-0">View All</Button>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="border-border/40">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base sm:text-lg">Preferences</CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm">Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-3 sm:space-y-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-xs sm:text-sm">Odds Display Format</Label>
                  <Select value={preferences.oddsFormat} onValueChange={(v) => setPreferences({...preferences, oddsFormat: v})}>
                    <SelectTrigger className="h-9 sm:h-10 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (45%)</SelectItem>
                      <SelectItem value="decimal">Decimal (2.22)</SelectItem>
                      <SelectItem value="fractional">Fractional (11/9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-xs sm:text-sm">Default Ticket Quantity</Label>
                  <Select value={preferences.defaultTickets} onValueChange={(v) => setPreferences({...preferences, defaultTickets: v})}>
                    <SelectTrigger className="h-9 sm:h-10 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 ticket</SelectItem>
                      <SelectItem value="5">5 tickets</SelectItem>
                      <SelectItem value="10">10 tickets</SelectItem>
                    </SelectContent>
                  </Select>
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
                <CardTitle className="text-base sm:text-lg">Activity Alerts</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Get notified about your entries and results</CardDescription>
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
                    <p className="font-medium text-sm">Odds Changes</p>
                    <p className="text-xs text-muted-foreground truncate">When odds shift on markets you've entered</p>
                  </div>
                  <Switch 
                    checked={notifications.oddsChanges}
                    onCheckedChange={(checked) => setNotifications({...notifications, oddsChanges: checked})}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Draw Results</p>
                    <p className="text-xs text-muted-foreground truncate">Weekly draw winners and your results</p>
                  </div>
                  <Switch 
                    checked={notifications.drawResults}
                    onCheckedChange={(checked) => setNotifications({...notifications, drawResults: checked})}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm">Entry Confirmations</p>
                    <p className="text-xs text-muted-foreground truncate">When your ticket purchase is confirmed</p>
                  </div>
                  <Switch 
                    checked={notifications.entryConfirmations}
                    onCheckedChange={(checked) => setNotifications({...notifications, entryConfirmations: checked})}
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
                    {privacy.showWinnings ? <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <EyeOff className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    <div className="min-w-0">
                      <p className="font-medium text-sm">Show Winnings</p>
                      <p className="text-xs text-muted-foreground truncate">Display your total winnings on your profile</p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.showWinnings}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showWinnings: checked})}
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    {privacy.showEntries ? <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <EyeOff className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    <div className="min-w-0">
                      <p className="font-medium text-sm">Show Active Entries</p>
                      <p className="text-xs text-muted-foreground truncate">Let others see your current entries</p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.showEntries}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showEntries: checked})}
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

            {/* Responsible Gambling */}
            <Card className="border-border/40">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <CardTitle className="text-base sm:text-lg">Responsible Gambling</CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm">Set limits to keep your experience healthy</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Daily Deposit Limit</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        type="number"
                        value={responsible.dailyLimit} 
                        onChange={(e) => setResponsible({...responsible, dailyLimit: e.target.value})}
                        placeholder="No limit"
                        className="h-9 sm:h-10 text-sm pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label className="text-xs sm:text-sm">Weekly Deposit Limit</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                      <Input 
                        type="number"
                        value={responsible.weeklyLimit} 
                        onChange={(e) => setResponsible({...responsible, weeklyLimit: e.target.value})}
                        placeholder="No limit"
                        className="h-9 sm:h-10 text-sm pl-7"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <Timer className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm">Session Time Reminder</p>
                      <p className="text-xs text-muted-foreground truncate">Get reminded to take a break</p>
                    </div>
                  </div>
                  <Switch 
                    checked={responsible.sessionReminder}
                    onCheckedChange={(checked) => setResponsible({...responsible, sessionReminder: checked})}
                  />
                </div>
                {responsible.sessionReminder && (
                  <div className="space-y-1.5 sm:space-y-2 pl-6 sm:pl-7">
                    <Label className="text-xs sm:text-sm">Reminder Interval</Label>
                    <Select value={responsible.reminderInterval} onValueChange={(v) => setResponsible({...responsible, reminderInterval: v})}>
                      <SelectTrigger className="h-9 sm:h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30min">Every 30 minutes</SelectItem>
                        <SelectItem value="1hr">Every 1 hour</SelectItem>
                        <SelectItem value="2hr">Every 2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="pt-2 border-t border-border/40">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-destructive">Self-Exclusion</p>
                      <p className="text-xs text-muted-foreground truncate">Temporarily lock yourself out</p>
                    </div>
                    <Select>
                      <SelectTrigger className="h-8 w-24 text-xs">
                        <SelectValue placeholder="Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">24 hours</SelectItem>
                        <SelectItem value="7d">7 days</SelectItem>
                        <SelectItem value="30d">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-xs sm:text-sm">Crypto Wallet Address</Label>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <Input 
                      value={cryptoWallet} 
                      onChange={(e) => setCryptoWallet(e.target.value)}
                      placeholder="0x..."
                      className="h-9 sm:h-10 text-sm font-mono"
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">For cryptocurrency withdrawals (ERC-20)</p>
                </div>
              </CardContent>
            </Card>

            {/* Deposit Limits */}
            {(responsible.dailyLimit || responsible.weeklyLimit) && (
              <Card className="border-border/40">
                <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Active Deposit Limits</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Managed in Privacy → Responsible Gambling</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 sm:pt-0 space-y-2">
                  {responsible.dailyLimit && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Daily limit</span>
                      <span className="font-medium">${responsible.dailyLimit}</span>
                    </div>
                  )}
                  {responsible.weeklyLimit && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Weekly limit</span>
                      <span className="font-medium">${responsible.weeklyLimit}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Button 
              variant="outline" 
              className="w-full gap-2 text-xs sm:text-sm h-9 sm:h-10"
              onClick={() => navigate("/portfolio")}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Transaction History
            </Button>
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
