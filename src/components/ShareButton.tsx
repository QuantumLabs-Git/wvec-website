'use client'

interface ShareButtonProps {
  title: string
  text?: string
}

export default function ShareButton({ title, text }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title,
        text: text || '',
        url: window.location.href,
      }).catch(console.error)
    } else {
      // Fallback to copy URL
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 bg-steel-blue text-white rounded-lg hover:bg-cyber-teal smooth-transition"
    >
      Share
    </button>
  )
}