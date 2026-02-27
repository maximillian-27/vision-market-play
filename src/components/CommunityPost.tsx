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
  originalPost?: {
    user: PostUser;
    text: string;
    timestamp: string;
    market?: PostMarket;
  };
  position?: { side: "YES" | "NO"; marketTitle: string };
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
    <div className={`flex gap-2.5 sm:gap-3 ${isNested ? "p-2.5 sm:p-3 rounded-xl border border-border/50 mt-2" : ""}`}>
      <Avatar
        className={`${isNested ? "h-5 w-5" : "h-8 w-8 sm:h-10 sm:w-10"} cursor-pointer flex-shrink-0`}
        onClick={() => navigate(`/profile/${user.username.slice(1)}`)}
      >
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="text-[9px] sm:text-[10px]">{user.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
          <span
            className="font-semibold text-[13px] sm:text-sm cursor-pointer hover:underline"
            onClick={() => navigate(`/profile/${user.username.slice(1)}`)}
          >
            {user.name}
          </span>
          <span className="text-muted-foreground text-xs sm:text-sm hidden sm:inline">{user.username}</span>
          <span className="text-muted-foreground text-xs sm:text-sm">·</span>
          <span className="text-muted-foreground text-xs sm:text-sm">{timestamp}</span>
        </div>
        <p className={`${isNested ? "text-[11px] sm:text-xs" : "text-[13px] sm:text-[15px]"} mt-0.5 leading-relaxed`}>{text}</p>
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
      icon: Heart,
      count: likeCount,
      active: liked,
      activeColor: "text-red-500",
      hoverBg: "hover:bg-red-500/10 hover:text-red-500",
      onClick: handleLike,
      fill: liked,
    },
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
      icon: Share,
      count: 0,
      active: false,
      activeColor: "",
      hoverBg: "hover:bg-primary/10 hover:text-primary",
      onClick: () => {},
    },
  ];

  return (
    <article className="border-b border-border/40 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-muted/20 transition-colors">
      {/* Repost header */}
      {post.type === "repost" && (
        <div className="flex items-center gap-1.5 ml-10 sm:ml-12 mb-1 text-[11px] sm:text-xs text-muted-foreground">
          <Repeat2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span className="font-medium">{post.user.name} reposted</span>
        </div>
      )}

      {/* Position header */}
      {post.type === "position" && post.position && (
        <div className="flex items-center gap-1.5 ml-10 sm:ml-12 mb-1 text-[11px] sm:text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
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
        ? renderPostContent(post.user, post.text, post.timestamp, undefined, false)
        : renderPostContent(post.user, post.text, post.timestamp, post.market)}

      {/* Nested original post for reposts */}
      {post.type === "repost" && post.originalPost && (
        <div className="ml-10 sm:ml-[52px]">
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
      <div className="flex items-center justify-between ml-10 sm:ml-[52px] mt-1.5 sm:mt-2 max-w-md">
        {engagementActions.map(({ icon: Icon, count, active, activeColor, hoverBg, onClick, fill }, i) => (
          <button
            key={i}
            onClick={onClick}
            className={`flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-full transition-colors text-[11px] sm:text-xs ${
              active ? activeColor : "text-muted-foreground"
            } ${hoverBg}`}
          >
            <Icon className={`h-4 w-4 sm:h-[18px] sm:w-[18px] ${fill ? "fill-current" : ""}`} />
            {count > 0 && <span>{count}</span>}
          </button>
        ))}
      </div>

      {/* Inline recent comments */}
      {post.recentComments && post.recentComments.length > 0 && (
        <div className="ml-10 sm:ml-[52px] mt-1.5 sm:mt-2 space-y-1.5 sm:space-y-2">
          {post.recentComments.slice(0, 2).map((comment, i) => (
            <div key={i} className="flex gap-1.5 sm:gap-2 items-start">
              <div className="w-px bg-border/60 self-stretch ml-1 flex-shrink-0" />
              <Avatar className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0">
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback className="text-[7px] sm:text-[8px]">{comment.user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs font-medium">{comment.user.name}</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground ml-1">{comment.timestamp}</span>
                <p className="text-[11px] sm:text-xs text-muted-foreground/90 mt-0.5">{comment.text}</p>
              </div>
            </div>
          ))}
          {post.comments > 2 && (
            <button
              onClick={() => setShowComments(true)}
              className="text-[11px] sm:text-xs text-primary ml-3 sm:ml-4 hover:underline"
            >
              Show more replies
            </button>
          )}
        </div>
      )}

      {/* Expanded comment input */}
      {showComments && (
        <div className="ml-10 sm:ml-[52px] mt-2 sm:mt-3 flex gap-2">
          <Avatar className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1.5 sm:space-y-2">
            <Textarea
              placeholder="Post your reply"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[36px] sm:min-h-[40px] text-xs sm:text-sm bg-transparent border-border/50 resize-none"
            />
            <div className="flex justify-end">
              <Button size="sm" className="rounded-full px-3 sm:px-4 h-7 text-xs" disabled={!commentText.trim()}>
                Reply
              </Button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
