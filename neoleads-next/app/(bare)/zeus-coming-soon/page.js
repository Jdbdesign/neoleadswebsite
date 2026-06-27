import Icon from '@/components/Icon';
import ZeusComingSoonScripts from '@/components/ZeusComingSoonScripts';

export const metadata = { title: 'Zeus is Suiting Up | NeoLeads' };

export default function ZeusComingSoonPage() {
  return (
    <>
      <main className="zeus-stage">
        {/* Eye */}
        <div className="eye-wrap" id="eyeWrap">
          <div className="eye-glow"></div>
          <svg className="eye-svg" id="eyeSvg" width="204" height="119" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <clipPath id="leftClip"><ellipse cx="62" cy="70" rx="46" ry="62" /></clipPath>
              <clipPath id="rightClip"><ellipse cx="178" cy="70" rx="46" ry="62" /></clipPath>
            </defs>

            {/* ===== LEFT EYE ===== */}
            <g clipPath="url(#leftClip)">
              {/* moving pupil */}
              <g className="pupil">
                <ellipse cx="56" cy="84" rx="25" ry="34" fill="#7C3AED" />
                <circle cx="48" cy="64" r="6.5" fill="#fff" opacity="0.92" />
              </g>
              {/* upper eyelid swoosh (sits over the pupil for depth) */}
              <path d="M18 74 C18 38, 38 11, 66 10 C45 23, 27 46, 18 74 Z" fill="#7C3AED" />
              {/* blink eyelid */}
              <rect className="eyelid" x="12" y="-122" width="100" height="130" fill="#02071A" />
            </g>
            <ellipse cx="62" cy="70" rx="46" ry="62" stroke="#7C3AED" strokeWidth="5" fill="none" />

            {/* ===== RIGHT EYE ===== */}
            <g clipPath="url(#rightClip)">
              <g className="pupil">
                <ellipse cx="172" cy="84" rx="25" ry="34" fill="#7C3AED" />
                <circle cx="164" cy="64" r="6.5" fill="#fff" opacity="0.92" />
              </g>
              <path d="M134 74 C134 38, 154 11, 182 10 C161 23, 143 46, 134 74 Z" fill="#7C3AED" />
              <rect className="eyelid" x="128" y="-122" width="100" height="130" fill="#02071A" />
            </g>
            <ellipse cx="178" cy="70" rx="46" ry="62" stroke="#7C3AED" strokeWidth="5" fill="none" />
          </svg>
        </div>

        {/* Pill */}
        <div className="zeus-pill" id="pill"><Icon name="zap" /> ZEUS PROSPECTING</div>

        {/* Headline */}
        <h1 className="zeus-headline" id="headline">Zeus is Suiting Up.</h1>

        {/* Subtext */}
        <p className="zeus-sub" id="sub"><span className="zeus-sub-inner">The most powerful prospecting engine in the game is getting its final battle-test. The gates open soon — Zeus is watching.</span></p>

        {/* Back */}
        <button className="zeus-back" id="back" type="button">← Back to NeoLeads</button>
      </main>

      <ZeusComingSoonScripts />
    </>
  );
}
