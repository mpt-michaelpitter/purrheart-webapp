export function PawPattern({ className, opacity = 0.15 }: { className?: string, opacity?: number }) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none  ${className}`}>
            <svg className="w-full h-full" style={{ opacity }} width="100%" height="100%">
                <defs>
                    <pattern id="paw-geometric-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">

                        {/* Large Solid Paw */}
                        <path d="M45 35c-4-6-12-6-16 0-4 6-1 12 5 12s12-6 11-12z M20 47c-5-2-9 2-7 7s7 7 12 2 0-7-5-9z M70 47c-5 5 0 12 5 10s7-7 5-12-5-3-10 2z M45 59c-10-4-15 6-13 12 3 8 10 10 20 3 5-4 3-11-7-15z"
                            fill="currentColor" />

                        {/* Outlined Triangle */}
                        <path d="M120 40 L135 65 L105 65 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" transform="rotate(15 120 55)" />

                        {/* Swirl */}
                        <path d="M170 45c3-5 10-6 15-1 5 5 2 12-2 15-6 4-15 0-17-7-3-8 3-17 11-20 10-2 20 4 22 13"
                            fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.9" />

                        {/* Cross/Plus */}
                        <path d="M60 110l12 12m0-12l-12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

                        {/* Squiggle Line */}
                        <path d="M130 130c4-4 8-4 12 0s8 4 12 0s8-4 12 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" transform="rotate(-15 142 130)" />

                        {/* Medium Solid Paw */}
                        <path d="M175 155c-3-5-9-5-12 0-3 5-1 9 4 9s9-4 8-9z M155 164c-4-1-7 2-5 5s5 5 9 1 0-5-4-6z M192 164c-4 4 0 9 4 8s5-5 4-9-4-2-8 1z M173 173c-8-3-11 5-9 9 2 6 8 8 15 2 4-3 2-8-6-11z"
                            fill="currentColor" transform="rotate(-10 173 165)" />

                        {/* Small Triangle */}
                        <path d="M30 160 L40 180 L20 180 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-20 30 170)" />

                        {/* Small Circle/Spiral */}
                        <path d="M90 160a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8" />

                        {/* Tiny Cross */}
                        <path d="M100 80l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#paw-geometric-pattern)" />
            </svg>
        </div>
    );
}
