import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InlineMarketPreview } from "@/components/InlineMarketPreview";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share,
  TrendingUp,
} from "lucide-react";

export interface PostUser {
  name: string;
  avatar: string;
  username: string;
}

export interface PostMarket {
  id: string;
  title: string;
  image: string;
  yesPrice: number;
  noPrice: number;
  volume: string;
}

export interface PostComment {
  user: PostUser;
  text: string;
  timestamp: string;
}

export interface CommunityPostData {
  id: string;
  type: "text" | "market" | "repost" | "position";
  user: PostUser;
  text: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  bookmarks: number;
  market?: PostMarket;
  // For repost type
  originalPost?: {
    user: PostUser;
    text: string;
    timestamp: string;
    market?: PostMarket;
  };
  // For position type
  position?: { side: "YES" | "NO"; marketTitle: string };
  // Inline comments
  recentComments?: PostComment[];
}

interface CommunityPostProps {
  post: CommunityPostData;
}

export function CommunityPost({ post }: CommunityPostProps) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [repostCount, setRepostCount] = useState(post.reposts);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const handleRepost = () => {
    setReposted(!reposted);
    setRepostCount((c) => (reposted ? c - 1 : c + 1));
  };

  const renderPostContent = (
    user: PostUser,
    text: string,
    timestamp: string,
    market?: PostMarket,
    isNested?: boolean
  ) => (
    <div className={`flex gap-3 ${isNested ? "p-3 rounded-xl border border-border/50 mt-2" : ""}`}>
      <Avatar
        className={`${isNested ? "h-5 w-5" : "h-10 w-10"} cursor-pointer flex-shrink-0`}
        onClick={() => navigate(`/profile/${user.username.slice(1)}`)}
      >
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="text-[10px]">{user.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span
            className="font-semibold text-sm cursor-pointer hover:underline"
            onClick={() => navigate(`/profile/${user.username.slice(1)}`)}
          >
            {user.name}
          </span>
          <span className="text-muted-foreground text-sm">{user.username}</span>
          <span className="text-muted-foreground text-sm">·</span>
          <span className="text-muted-foreground text-sm">{timestamp}</span>
        </div>
        <p className={`${isNested ? "text-xs" : "text-[15px]"} mt-0.5 leading-relaxed`}>{text}</p>
        {market && (
          <InlineMarketPreview
            id={market.id}
            title={market.title}
            image={market.image}
            yesPrice={market.yesPrice}
            noPrice={market.noPrice}
            volume={market.volume}
          />
        )}
      </div>
    </div>
  );

  const engagementActions = [
    {
      icon: MessageCircle,
      count: post.comments,
      active: false,
      activeColor: "",
      hoverBg: "hover:bg-primary/10 hover:text-primary",
      onClick: () => setShowComments(!showComments),
    },
    {
      icon: Repeat2,
      count: repostCount,
      active: reposted,
      activeColor: "text-green-500",
      hoverBg: "hover:bg-green-500/10 hover:text-green-500",
      onClick: handleRepost,
    },
    {
      icon: Heart,
      count: likeCount,
      active: liked,
      activeColor: "text-red-500",
      hoverBg: "hover:bg-red-500/10 hover:text-red-500",
      onClick: handleLike,
      fill: liked,
    },
    {
      icon: Share,
      count: 0,
      active: false,
      activeColor: "",
      hoverBg: "hover:bg-primary/10 hover:text-primary",
      onClick: () => {},
    },
  ];

  return (
    <article className="border-b border-border/40 px-4 py-3 hover:bg-muted/20 transition-colors">
      {/* Repost header */}
      {post.type === "repost" && (
        <div className="flex items-center gap-2 ml-12 mb-1 text-xs text-muted-foreground">
          <Repeat2 className="h-3.5 w-3.5" />
          <span className="font-medium">{post.user.name} reposted</span>
        </div>
      )}

      {/* Position header */}
      {post.type === "position" && post.position && (
        <div className="flex items-center gap-2 ml-12 mb-1 text-xs text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>
            <span className="font-medium">{post.user.name}</span> bought{" "}
            <span className={`font-bold ${post.position.side === "YES" ? "text-success" : "text-destructive"}`}>
              {post.position.side}
            </span>
          </span>
        </div>
      )}

      {/* Main post content */}
      {post.type === "repost" && post.originalPost
        ? renderPostContent(
            post.user,
            post.text,
            post.timestamp,
            undefined,
            false
          )
        : renderPostContent(post.user, post.text, post.timestamp, post.market)}

      {/* Nested original post for reposts */}
      {post.type === "repost" && post.originalPost && (
        <div className="ml-[52px]">
          {renderPostContent(
            post.originalPost.user,
            post.originalPost.text,
            post.originalPost.timestamp,
            post.originalPost.market,
            true
          )}
        </div>
      )}

      {/* Engagement bar */}
      <div className="flex items-center justify-between ml-[52px] mt-2 max-w-md">
        {engagementActions.map(({ icon: Icon, count, active, activeColor, hoverBg, onClick, fill }, i) => (
          <button
            key={i}
            onClick={onClick}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-full transition-colors text-xs ${
              active ? activeColor : "text-muted-foreground"
            } ${hoverBg}`}
          >
            <Icon className={`h-[18px] w-[18px] ${fill ? "fill-current" : ""}`} />
            {count > 0 && <span>{count}</span>}
          </button>
        ))}
      </div>

      {/* Inline recent comments */}
      {post.recentComments && post.recentComments.length > 0 && (
        <div className="ml-[52px] mt-2 space-y-2">
          {post.recentComments.slice(0, 2).map((comment, i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="w-px bg-border/60 self-stretch ml-[5px] flex-shrink-0" />
              <Avatar className="h-5 w-5 flex-shrink-0">
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback className="text-[8px]">{comment.user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <span className="text-xs font-medium">{comment.user.name}</span>
                <span className="text-xs text-muted-foreground ml-1.5">{comment.timestamp}</span>
                <p className="text-xs text-muted-foreground/90 mt-0.5">{comment.text}</p>
              </div>
            </div>
          ))}
          {post.comments > 2 && (
            <button
              onClick={() => setShowComments(true)}
              className="text-xs text-primary ml-4 hover:underline"
            >
              Show more replies
            </button>
          )}
        </div>
      )}

      {/* Expanded comment input */}
      {showComments && (
        <div className="ml-[52px] mt-3 flex gap-2">
          <Avatar className="h-7 w-7 flex-shrink-0">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Post your reply"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[40px] text-sm bg-transparent border-border/50 resize-none"
            />
            <div className="flex justify-end">
              <Button size="sm" className="rounded-full px-4" disabled={!commentText.trim()}>
                Reply
              </Button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
