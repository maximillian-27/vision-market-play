import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ExternalLink, Check, Clock, AlertCircle, Globe, Tag, Search,
  BarChart3, Mail, Users, Share2, MessageCircle, Megaphone
} from "lucide-react";

const integrations = [
  { name: "Google Tag Manager", id: "GTM-XXXXXXX", status: "placeholder", url: "https://tagmanager.google.com/#/home", description: "Replace GTM-XXXXXXX in index.html with your container ID" },
  { name: "GA4 (Google Analytics)", id: "Not configured", status: "not_started", url: "https://analytics.google.com/analytics/web/#/", description: "Create a GA4 property and connect via GTM" },
  { name: "Google Search Console", id: "Not verified", status: "not_started", url: "https://search.google.com/search-console", description: "Verify domain ownership for indexing & SEO reporting" },
  { name: "Bing Webmaster Tools", id: "Not verified", status: "not_started", url: "https://www.bing.com/webmasters/about", description: "Yahoo & Bing search indexing and ranking" },
  { name: "Yandex Metrica", id: "Optional", status: "not_started", url: "https://ads.yandex/metrica", description: "Free heatmaps, click maps, session recordings" },
];

const trackedEvents = [
  { name: "regstarted", category: "Registration", action: "Started", lastFired: "2 min ago", count24h: 347 },
  { name: "regcomplete", category: "Registration", action: "Complete", lastFired: "5 min ago", count24h: 289 },
  { name: "depositstarted", category: "Deposit", action: "Started", lastFired: "1 min ago", count24h: 156 },
  { name: "depositcomplete", category: "Deposit", action: "Complete", lastFired: "3 min ago", count24h: 134 },
  { name: "betcomplete", category: "Betting", action: "Complete", lastFired: "30s ago", count24h: 1245 },
  { name: "formsubmission", category: "Forms", action: "Submit", lastFired: "12 min ago", count24h: 89 },
  { name: "pageview", category: "Navigation", action: "View", lastFired: "1s ago", count24h: 24500 },
];

const seoChecklist = [
  { item: "robots.txt", done: true, note: "Configured with sitemap reference" },
  { item: "sitemap.xml", done: true, note: "Static sitemap with core routes" },
  { item: "llms.txt", done: true, note: "AI-friendly platform description" },
  { item: "Meta tags (title, description, OG)", done: true, note: "Updated with Pollgy branding" },
  { item: "Canonical URLs", done: true, note: "Added to index.html" },
  { item: "JSON-LD Structured Data", done: true, note: "WebSite + Organization schema" },
  { item: "Hreflang tags (i18n)", done: false, note: "Pending: SR, RO, GR, HU locales" },
  { item: "Alt & Title tags on images", done: false, note: "Audit needed across all pages" },
  { item: "Internal linking strategy", done: false, note: "Blog + SEO blocks needed" },
  { item: "SEO content blocks (bottom of pages)", done: false, note: "Requires content creation" },
  { item: "Rich Snippets / Markup testing", done: false, note: "Test at search.google.com/test/rich-results" },
];

const channels = [
  { name: "CRM", status: "not_started", recommendation: "Zoho, HubSpot, SugarCRM", icon: Users },
  { name: "ESP (Email)", status: "not_started", recommendation: "Mailchimp, SendGrid", icon: Mail },
  { name: "Refer-A-Friend", status: "not_started", recommendation: "Custom or ReferralCandy", icon: Share2 },
  { name: "Affiliate Program", status: "not_started", recommendation: "CPA / Rev Share / Hybrid", icon: Megaphone },
  { name: "BI Platform", status: "not_started", recommendation: "Looker Studio (free)", icon: BarChart3 },
  { name: "SEO Tools", status: "not_started", recommendation: "SEMrush, Ahrefs", icon: Search },
];

const socialPlatforms = [
  { name: "X (Twitter)", geos: ["Balkan", "English", "Greek"], status: "not_started" },
  { name: "Discord", geos: ["General"], status: "not_started" },
  { name: "Twitch", geos: ["General"], status: "not_started" },
  { name: "Meta (FB, IG, Threads)", geos: ["Balkan", "English", "Greek"], status: "not_started" },
  { name: "TikTok", geos: ["Balkan", "English"], status: "not_started" },
  { name: "Reddit", geos: ["English"], status: "not_started" },
  { name: "Snapchat", geos: ["Balkan"], status: "not_started" },
];

const statusBadge = (status: string) => {
  switch (status) {
    case "connected": return <Badge className="bg-success/10 text-success border-0 text-xs"><Check className="h-3 w-3 mr-1" /> Connected</Badge>;
    case "placeholder": return <Badge className="bg-warning/10 text-warning border-0 text-xs"><Clock className="h-3 w-3 mr-1" /> Placeholder</Badge>;
    case "in_progress": return <Badge className="bg-primary/10 text-primary border-0 text-xs"><Clock className="h-3 w-3 mr-1" /> In Progress</Badge>;
    default: return <Badge className="bg-muted text-muted-foreground border-0 text-xs"><AlertCircle className="h-3 w-3 mr-1" /> Not Started</Badge>;
  }
};

export const AdminMarketing = () => {
  const completedSeo = seoChecklist.filter(s => s.done).length;
  const totalSeo = seoChecklist.length;

  return (
    <div className="space-y-6">
      {/* Integrations Status */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Tag className="h-4 w-4" /> Integrations & Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {integrations.map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{integration.name}</span>
                  {statusBadge(integration.status)}
                </div>
                <p className="text-xs text-muted-foreground">{integration.description}</p>
                <p className="text-xs font-mono text-muted-foreground">{integration.id}</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a href={integration.url} target="_blank" rel="noopener noreferrer" className="gap-1">
                  <ExternalLink className="h-3 w-3" /> Setup
                </a>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Event Tracking */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Event Tracking Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40 text-left text-sm text-muted-foreground">
                  <th className="p-2 font-medium">Event Name</th>
                  <th className="p-2 font-medium">Category</th>
                  <th className="p-2 font-medium">Action</th>
                  <th className="p-2 font-medium">Last Fired</th>
                  <th className="p-2 font-medium text-right">Count (24h)</th>
                </tr>
              </thead>
              <tbody>
                {trackedEvents.map((evt) => (
                  <tr key={evt.name} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    <td className="p-2 font-mono text-sm text-primary">{evt.name}</td>
                    <td className="p-2 text-sm">{evt.category}</td>
                    <td className="p-2 text-sm text-muted-foreground">{evt.action}</td>
                    <td className="p-2 text-sm text-muted-foreground">{evt.lastFired}</td>
                    <td className="p-2 text-sm font-medium text-right">{evt.count24h.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Events sync with GTM dataLayer → GA4. See src/lib/analytics.ts for implementation.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* SEO Checklist */}
        <Card className="border-border/40">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2"><Globe className="h-4 w-4" /> SEO Checklist</CardTitle>
              <span className="text-sm text-muted-foreground">{completedSeo}/{totalSeo}</span>
            </div>
            <Progress value={(completedSeo / totalSeo) * 100} className="h-2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-2">
            {seoChecklist.map((item) => (
              <div key={item.item} className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                <Checkbox checked={item.done} disabled className="mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${item.done ? 'text-muted-foreground line-through' : ''}`}>{item.item}</p>
                  <p className="text-xs text-muted-foreground">{item.note}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Channels & Platforms */}
        <Card className="border-border/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Megaphone className="h-4 w-4" /> Channels & Platforms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {channels.map((ch) => (
              <div key={ch.name} className="flex items-center justify-between p-2 rounded hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <ch.icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{ch.name}</p>
                    <p className="text-xs text-muted-foreground">{ch.recommendation}</p>
                  </div>
                </div>
                {statusBadge(ch.status)}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Social Media Presence */}
      <Card className="border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><MessageCircle className="h-4 w-4" /> Social Media Presence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {socialPlatforms.map((platform) => (
              <div key={platform.name} className="p-3 rounded-lg bg-muted/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{platform.name}</span>
                  {statusBadge(platform.status)}
                </div>
                <div className="flex flex-wrap gap-1">
                  {platform.geos.map((geo) => (
                    <Badge key={geo} variant="outline" className="text-xs">{geo}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">GEO-specific profiles needed: Balkan (general), English, Greek. Consider adding Hungarian, Russian as needed.</p>
        </CardContent>
      </Card>
    </div>
  );
};
