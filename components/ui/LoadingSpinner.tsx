export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" style={{borderColor: 'var(--color-primary)', borderTopColor: 'transparent'}}></div>
        <div className="absolute inset-2 rounded-full border-4 border-b-transparent animate-spin-reverse" style={{borderColor: 'var(--color-accent)', borderBottomColor: 'transparent'}}></div>
      </div>
    </div>
  );
}
