export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border animate-pulse" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
      <div className="aspect-square" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}></div>
      <div className="p-5 space-y-3">
        <div className="h-4 rounded" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '80%'}}></div>
        <div className="h-3 rounded" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '40%'}}></div>
        <div className="h-6 rounded" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '50%'}}></div>
      </div>
    </div>
  );
}
