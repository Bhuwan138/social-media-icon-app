import SocialMediaSelector from '@/components/SocialMediaSelector';

export default function SocialMediaPage() {
  return (
      <div style={
            {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
            }

      }>
        <h1>Social Media Icon Selector</h1>
        <SocialMediaSelector />
      </div>
  );
}
