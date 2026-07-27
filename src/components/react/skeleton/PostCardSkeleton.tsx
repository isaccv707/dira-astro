const PostCardSkeleton = () => {
  return (
    <div className="w-full h-full bg-white border border-ui-border rounded-clinical-md shadow-xs overflow-hidden animate-pulse">
      <div className="aspect-video bg-ui-bg" />

      <div className="p-6 md:p-8">
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-ui-border rounded-clinical-sm" />
          <div className="h-5 w-20 bg-ui-border rounded-clinical-sm" />
        </div>

        <div className="mt-4 h-6 w-4/5 bg-ui-border rounded-full" />
        <div className="mt-3 h-6 w-2/3 bg-ui-border rounded-full" />

        <div className="mt-5 space-y-3">
          <div className="h-3 w-full bg-ui-bg rounded-full" />
          <div className="h-3 w-full bg-ui-bg rounded-full" />
          <div className="h-3 w-3/4 bg-ui-bg rounded-full" />
        </div>

        <div className="mt-8 pt-6 border-t border-ui-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-ui-border" />
          <div className="space-y-2">
            <div className="h-3 w-20 bg-ui-border rounded-full" />
            <div className="h-2 w-12 bg-ui-bg rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
