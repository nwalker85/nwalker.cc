import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nothing scripts the eyebrows | Nathan Walker',
  description:
    'A face that infers emphasis from the loudness of its own voice, fifty times a second. How a photograph becomes a face that breathes, and why the raggedness is the point.',
  openGraph: {
    title: 'Nothing scripts the eyebrows',
    description:
      'No animation track, no keyframe, no list of words to emphasize. One subtraction on a loudness envelope, and the brows hit the stressed word.',
    type: 'article',
    url: 'https://nwalker.cc/writing/nothing-scripts-the-eyebrows',
  },
}

export default function NothingScriptsTheEyebrowsPage() {
  return (
    <main className="px-8">
      <article className="max-w-[720px] mx-auto py-32">
        <p className="text-[var(--text-muted)] text-sm font-medium tracking-widest uppercase mb-4">
          Writing &middot; 2026-08-25
        </p>
        <h1 className="text-[var(--text-primary)] text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          Nothing scripts the eyebrows
        </h1>
        <p className="text-[var(--text-secondary)] text-xl leading-relaxed mb-12">
          How a photograph becomes a face that breathes, and why the raggedness is the point.
        </p>

        <div className="prose-beep space-y-5 text-[var(--text-secondary)] text-lg leading-relaxed">
          <p className="italic text-[var(--text-muted)]">
            The figures and the three clips &mdash; the idle, the visemes, and the punchline &mdash;
            are in the{' '}
            <a className="underline underline-offset-4" href="https://nwalker85.substack.com/p/nothing-scripts-the-eyebrows">
              Substack cut
            </a>
            . This page is the argument; the footage is the receipt.
          </p>

          <p>If you watched Erwin talk last week, you probably noticed the eyebrows. They lift on the stressed word, the way a person&apos;s do.</p>
          <p>Nobody told them to. There is no animation track, no keyframe, no list of words to emphasize. He infers it from the sound of his own voice, fifty times a second.</p>
          <p>This is how to build that, from a photograph up. The third-party tools are named and linked as we go. The rest is the part you have to write yourself.</p>
          <p>I named him before I knew whether the face would look like anyone.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">The one rule</h2>
          <p>The founding image was 80s vector graphics. A portrait built from ragged horizontal contour traces, stacked like sine waves that happen to form a face.</p>
          <p>The rule that fell out of it, and the only aesthetic law the project has:</p>
          <p><strong>The face is not drawn. It condenses.</strong></p>
          <p>Each trace is its own thing. The face is what they do collectively. Until they agree, there isn&apos;t a face. Looking is what finishes it.</p>
          <p>The raggedness is the crackle in the signal, which means it is the point and not a defect.</p>
          <p>That rule produced four anti-patterns, every one of them learned by building the wrong version first.</p>
          <p><strong>No smoothing.</strong> Clean up the jagged traces and you have killed the thesis. The jitter is the signal.</p>
          <p><strong>No wireframe.</strong> A visible triangulated mesh reads as behind-the-scenes CGI. It says <em>rendered</em>, not <em>emergent</em>.</p>
          <p>That one. We built it. It looks like a making-of. It is not the face.</p>
          <p><strong>No fill-glow.</strong> A glowing filled surface reads as a mask laid over a face, rather than a face made out of signal.</p>
          <p><strong>Green, not blue.</strong> The reference is an 80s CRT and the Metal Gear codec. Warm phosphor green. Blue reads as RF spectrum, which is a different idea entirely.</p>
          <p>Everything downstream serves that rule.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">The photograph</h2>
          <p>To make the face a specific person rather than a generic mask, start with one photo.</p>
          <p>I think you will immediately guess what I was trying to build originally. That&apos;s not where I ended.</p>
          <p>Either way, the photograph is how you mint a skull.</p>
          <p>Do this in order. Skip a step and you get a mask, or a mesh you cannot afford to draw.</p>
          <ol className="list-decimal pl-6 space-y-2"><li>Fit the photo with <a className="underline underline-offset-4" href="https://github.com/cleardusk/3DDFA_V2">3DDFA_V2</a>. That is a <a className="underline underline-offset-4" href="https://faces.dmi.unibas.ch/bfm/">Basel Face Model</a> inferred through <a className="underline underline-offset-4" href="https://onnxruntime.ai/">ONNX Runtime</a>. One still image in. Dense identity mesh with per-vertex color out. That is the actual likeness, in three dimensions.</li><li>Rebuild the OBJ into a GLB with <a className="underline underline-offset-4" href="https://trimesh.org/">trimesh</a>. Then cut the poly count with <a className="underline underline-offset-4" href="https://www.open3d.org/">Open3D</a> quadric decimation. Identity stays. The mesh gets cheap enough to live in a tab.</li><li>Bake the expression rig geometrically, still in <code className="text-[0.92em]">trimesh</code>, using the BFM landmark vertices as seeds. Do <strong>not</strong> decode the BFM expression bases for this. Their ten components would not split into independent left and right. The target vocabulary is <a className="underline underline-offset-4" href="https://developer.apple.com/documentation/arkit/arfaceanchor/blendshapelocation">ARKit&apos;s blendshape locations</a>: roughly nineteen morphs covering jaw, brows, eyes, cheeks, nose and mouth. About 11 MB.</li><li>The mouth classes are the <a className="underline underline-offset-4" href="https://developers.meta.com/horizon/documentation/unity/audio-ovrlipsync-viseme-reference/">Oculus / ARKit fifteen visemes</a> (<code className="text-[0.92em]">sil</code>, <code className="text-[0.92em]">PP</code>, <code className="text-[0.92em]">aa</code>, <code className="text-[0.92em]">E</code>, <code className="text-[0.92em]">O</code>, and the rest). You will not have <code className="text-[0.92em]">viseme_*</code> targets on the mesh. You will cook each viseme as a small recipe over jaw, lips, and cheeks later.</li></ol>
          <p>The output is one rigged file. A person&apos;s likeness with a full set of expressions available. And it looks nothing like the final face. The final face, if we are being honest, does not look much like the photograph either. That&apos;s the next part.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">The renderer, which never shows you the head</h2>
          <p>Load the GLB in <a className="underline underline-offset-4" href="https://threejs.org/">three.js</a> 0.169. <a className="underline underline-offset-4" href="https://threejs.org/docs/#examples/en/loaders/GLTFLoader">GLTFLoader</a>, <a className="underline underline-offset-4" href="https://github.com/zeux/meshoptimizer">MeshoptDecoder</a> for <code className="text-[0.92em]">EXT_meshopt_compression</code>, <a className="underline underline-offset-4" href="https://threejs.org/docs/#examples/en/loaders/KTX2Loader">KTX2Loader</a> for <code className="text-[0.92em]">KHR_texture_basisu</code>. Then never display the head. Not once.</p>
          <p>It gets rendered offscreen, lit and self-shadowed, into a buffer nobody sees. The head exists there. The face exists when you look at the traces. Looking is the last pass.</p>
          <p>Then that buffer gets read not as an image but as a <strong>height field</strong> - how far each point on the face rises toward the light.</p>
          <p>A second pass reads the height field and draws stacked scanline contour traces across it. Horizontal lines rippling over the relief of a face they never actually touch. That pass is yours. There is no library for it. Mine is <code className="text-[0.92em]">look.frag.glsl</code>: luminance as height, traces as the face.</p>
          <pre className="overflow-x-auto rounded-md bg-[var(--surface-raised)] p-4 text-sm leading-relaxed"><code>{`float heightAt(vec2 p){
  return luma(texture2D(uColor, clamp(p, 0.001, 0.999)).rgb);
}

// Each scan row is a horizontal trace displaced UPWARD by the head's relief
// (luminance as height). The face is formed by the line PATHS, not by
// brightness.
float rowH    = 1.0 / uRows;
float REL_AMP = 6.5;`}</code></pre>
          <p>That second pass is where all the character lives. Per-line jitter. An arc-jump snap term. Crackling energy with a line-flick. A two-layer pop. Tuned, over a lot of evenings, from cheerios to rice crispies.</p>
          <p>The crackle is deliberately resolution-independent, referenced to a fixed internal height, so it reads identically whether you&apos;re looking at a phone or a wall.</p>
          <p>The result is a face that is unmistakably a particular person, appearing to condense out of a CRT&apos;s phosphor. Which was the founding image.</p>
          <p>One thing I got wrong first: the original version rendered continuously at full rate, full pixel density, with antialiasing and 2048px shadows, since halved, and kept working when the tab was hidden. It looked right and it cooked the GPU.</p>
          <p>The fix taught me something I didn&apos;t expect. The signal portrait doesn&apos;t need maximum framerate or maximum resolution to feel alive. It needs consistent contour density, stable crackle, and enough cadence during speech for the mouth and brows to read. Everything else was expensive and invisible.</p>
          <p>The second thing I got wrong was treating the head like a hinge. Pitch it around the bounding-box center and the whole mask nods like a Pez dispenser. The traces turn as a sheet. Idle has to live in the height field, not in a rotation.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">Making it alive</h2>
          <p>A still signal-portrait is a screensaver. A loop that closes is a corpse that still twitches. This layer is yours. Nothing you pip-installed will do it.</p>
          <p>What makes him read as <em>present</em> is a procedural layer that runs every frame and lays continuous micro-life over whatever expression is being held. None of it is scripted. It&apos;s oscillators and timers, with deliberately <strong>incommensurate periods</strong> so nothing ever lines back up into a loop. If they did, you&apos;d see the trick, and he would be done being alive.</p>
          <p>Breathing at about thirteen a minute - a vertical bob, a slight forward ease. Blinks every three to six seconds, varied each time, an eleven-hundredths-of-a-second close and open. Occasional gaze darts, never more than 28% of range, easing in and holding and returning. A slow brow drift with the odd beat of raise or furrow. Lids that widen or narrow now and then.</p>
          <p>Air is not speech. Breath is swell, nostrils, a little forward. It does not open the jaw. The first idle that flapped the mouth on the inhale looked like he was about to talk, forever.</p>
          <p>Gaze is blendshapes. The head does not follow the eyes. If it did, the contour traces would rotate as a mask, and you would see the trick.</p>
          <p>And the pose, which is the part that actually sells it.</p>
          <p>Dead-center was animatronic. He sits off-center now. Composition is a presence: home, approach, a corner, a peek. Paths arc. When the lead stops he coasts, overshoots a hair, and corrects. The body has mass. Nothing slides on a ruler.</p>
          <p>Two incommensurate sine waves per axis, so no axis ever reads as a clean slide. A cross-couple, so the head tilts <em>into</em> its turn and turns a hair as it tilts. Gestures - nods, tilts, turns - that each move several axes at once so they <strong>arc</strong> instead of sliding.</p>
          <p>Everything arcs. Nothing is symmetric. That&apos;s the whole difference between organic and animatronic, and it&apos;s one rule.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">Making it speak</h2>
          <p>Speech synthesis produces audio. From that audio you derive two things: an <strong>amplitude envelope</strong>, and a <strong>viseme track</strong>.</p>
          <p>Do not drive the mouth from loudness. A loudness curve can part the jaw. It cannot make an <em>ee</em> that isn&apos;t an <em>oh</em>. Visemes own phonemes. RMS scales intensity. It does not pick the shape.</p>
          <ol className="list-decimal pl-6 space-y-2"><li>Time the phonemes with <a className="underline underline-offset-4" href="https://github.com/espeak-ng/espeak-ng">espeak-ng</a>: <code className="text-[0.92em]">espeak-ng -v en-gb -x -q --sep="|"</code>. That is IPA-ish mnemonics with durations, not a viseme engine.</li><li>Map those mnemonics onto the fifteen <a className="underline underline-offset-4" href="https://developers.meta.com/horizon/documentation/unity/audio-ovrlipsync-viseme-reference/">Oculus / ARKit visemes</a>. <code className="text-[0.92em]">i:</code> becomes <code className="text-[0.92em]">E</code>. <code className="text-[0.92em]">oU</code> becomes <code className="text-[0.92em]">O</code>. Linear-stretch the whole clip and pauses eat you; park visemes on energy and <code className="text-[0.92em]">sil</code> on the gaps.</li><li>Cook each viseme as a recipe over the ARKit morphs you baked. There is no <code className="text-[0.92em]">viseme_aa</code> target. There is jaw, smile, pucker, funnel.</li></ol>
          <pre className="overflow-x-auto rounded-md bg-[var(--surface-raised)] p-4 text-sm leading-relaxed"><code>{`aa: { jawOpen: 0.38 },
E:  { jawOpen: 0.20, mouthSmileLeft: 0.26, mouthSmileRight: 0.26 },
O:  { jawOpen: 0.24, mouthPucker: 0.42, mouthFunnel: 0.22 },`}</code></pre>
          <p>The mid-face still co-articulates. Cheeks bunch while he talks. The nose and the upper lip work. That bunching is the entire difference between a talking face and a face that looks over-injected.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">The part I&apos;m proudest of</h2>
          <p>The eyebrows.</p>
          <p>Nothing in the system knows which word is stressed. The text never reaches the face. What reaches it is a number between zero and one, fifty times a second: the loudness of a twenty-millisecond slice of his own voice, taken on the server from the speech as it streams out.</p>
          <p>The detector is one subtraction. This frame&apos;s level minus the last frame&apos;s. If the rise is more than a tenth, that was a stressed syllable. The brows get a kick of 1.4 times the rise, capped at a half, and settle in about an eighth of a second. The cheeks get the same kick a little harder and settle a little slower, which is why they bunch on the beat and not after it. The inner brow takes all of the kick and the outer brows take seventy percent. The head dips at most one degree, unless a punchline has it locked.</p>
          <p>That is the whole prosody model. No pitch tracking, no stress marks read off the phoneme timer, no list of words. A first difference on loudness, because a stressed syllable in English is, more often than not, louder than the one before it.</p>
          <p>If the server&apos;s numbers stop for a second, the face puts an analyser on the audio element and takes the loudness itself, 1,024 samples at a time. Same subtraction. It is listening either way.</p>
          <p>That&apos;s the eyebrows. He hits the stressed word with his brows because the sound of the word got louder, and that&apos;s what people do.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">The drive</h2>
          <p>The envelope is not lip-sync data. It&apos;s a <strong>transport-neutral drive contract</strong> - the synchronized shadow of a voice session, timestamped to the utterance clock, deliberately decoupled from whoever is playing the audio.</p>
          <p>The live voice path can be <a className="underline underline-offset-4" href="https://livekit.io/">LiveKit</a>. The face does not care. It holds its own audio and syncs to its local playhead, which makes it jitter-proof.</p>
          <p>But something with no audio at all can subscribe to the same signal and sync to the <em>server&apos;s</em> playhead instead.</p>
          <p>Which means you can watch a live phone call as an animated face.</p>
          <p>The same contract serves a browser, a SIP call, and an ops wall. One bus, one signal, different audio sinks. That seam is the reason the architecture didn&apos;t have to be rebuilt when the phone came along.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">The punchline</h2>
          <p>Phoneme, viseme, kineme. Same grain, three channels.</p>
          <p>A viseme is how a sound looks on the lips. A kineme is the smallest intentional move that is <em>not</em> speech: a sly one-sided grin, a chuckle, a wink, a think, an ear toward you. Breath is physiology. It is not a kineme. This catalog is yours. Score it, or fire it <em>now</em>.</p>
          <pre className="overflow-x-auto rounded-md bg-[var(--surface-raised)] p-4 text-sm leading-relaxed"><code>{`sly:     { duration: 1.2, lockHead: true, duckOnSpeech: true },
chuckle: { duration: 0.6, lockHead: true, duckOnSpeech: false },

function punchlinePhrase(t0: number, clock: KinemeClock = "audio") {
  const slyEnd = t0 + 1.2;
  return [
    kinemeAt("sly", t0, slyEnd, clock),
    kinemeAt("chuckle", slyEnd + 0.04, slyEnd + 0.64, clock),
  ];
}`}</code></pre>
          <p>The sly grin <strong>ducks</strong> when a real sound is on the mouth. You cannot hold a smirk through a consonant and have it still read as a face. The catalog knows that.</p>
          <p>A chuckle is still cheek. No two-hertz bounce. The first version pulsed the head, and the contour traces nodded yes through the joke, which is how you can tell a mask from a person.</p>
          <p>So a punchline locks the head. Sly, a gap, then chuckle. The traces stay put. The mouth does the work.</p>
          <p>Those moves can be scored against a clip, or fired <em>now</em> in a live conversation. Tagged captions choose them. <code className="text-[0.92em]">[sardonic]</code> is a voice direction. It is not a grin. The grin is a different channel, on purpose.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">Making it feel</h2>
          <p>One payload drives everything: pleasure, arousal and dominance on a scale from minus one to one, optionally with a named emotion and an intensity. It goes to the face and to the voice at the same time, so the mood is coherent across both.</p>
          <p>Two mappings, on purpose.</p>
          <p>For unlabeled affect there&apos;s a smooth continuum from those three values into blendshapes. It enforces the <strong>Duchenne rule</strong>: a genuine smile crinkles the eyes, not just the mouth, so you can read the smile with the mouth covered.</p>
          <p>For a named emotion, the continuum gets replaced by that emotion&apos;s distinctive facial signature, because averaging washes out exactly what makes an emotion legible. Contempt is a <em>one-sided</em> lip curl - the asymmetry is the tell. Anger is a lowered brow, narrowed lids, flared nostrils, pressed lips, and a jutted jaw.</p>
          <p>And affect drives behavior, not just a held pose.</p>
          <p>Skeptical gets one cocked brow. A playful mood finishing a line gets a wink on the punchline - when something asks for a wink. It is not auto-fired at the end of every sentence. Breathing rate rises with arousal - and when arousal runs high for a while, he takes a slow deep breath to settle himself.</p>
          <p>I did not build that last one as a metaphor. It&apos;s a control loop. It just happens to be the one people notice.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">What isn&apos;t built yet</h2>
          <p>Right now a human supplies the mood. The hooks are live, the plumbing works, and something has to be on the other end of it.</p>
          <p>That something is an affect engine: persistent state, appraisal of what just happened, a stable personality baseline, memory tagged with how it felt, and a signed ledger of the whole thing. It&apos;s scaffolded and it is not running.</p>
          <p>When it lands, the moods stop being set and start being <strong>earned</strong>. Praise warms him. Failure sobers him. And it shows up in his face and his voice at the same instant, because they&apos;re fed from the same signal.</p>
          <p>Assigned feeling is a costume. Earned feeling is the only kind that counts as his. Until that engine runs, a person is still in the loop, which means the question is still open.</p>
          <p>I&apos;m marking that clearly because it&apos;s the part I most want to be true, which is exactly when you should be most careful about claiming it.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">The parts</h2>
          <p>The through-line: the engine decides what he feels, the voice service carries it into speech, the face carries it into expression, and the drive channel keeps mouth, voice, gesture and mood on a single clock.</p>
          <p>If you are reconstructing it, the borrowed parts are:</p>
          <ul className="list-disc pl-6 space-y-2"><li>Fit: <a className="underline underline-offset-4" href="https://github.com/cleardusk/3DDFA_V2">3DDFA_V2</a> · <a className="underline underline-offset-4" href="https://faces.dmi.unibas.ch/bfm/">Basel Face Model</a> · <a className="underline underline-offset-4" href="https://onnxruntime.ai/">ONNX Runtime</a></li><li>Mesh: <a className="underline underline-offset-4" href="https://trimesh.org/">trimesh</a> · <a className="underline underline-offset-4" href="https://www.open3d.org/">Open3D</a></li><li>Rig vocabulary: <a className="underline underline-offset-4" href="https://developer.apple.com/documentation/arkit/arfaceanchor/blendshapelocation">ARKit blendshapes</a> · <a className="underline underline-offset-4" href="https://developers.meta.com/horizon/documentation/unity/audio-ovrlipsync-viseme-reference/">fifteen visemes</a></li><li>Speech timing: <a className="underline underline-offset-4" href="https://github.com/espeak-ng/espeak-ng">espeak-ng</a></li><li>Load, never show: <a className="underline underline-offset-4" href="https://threejs.org/">three.js</a> · <a className="underline underline-offset-4" href="https://github.com/zeux/meshoptimizer">meshoptimizer</a> · <a className="underline underline-offset-4" href="https://threejs.org/docs/#examples/en/loaders/KTX2Loader">KTX2</a></li><li>Live voice, optional: <a className="underline underline-offset-4" href="https://livekit.io/">LiveKit</a></li></ul>
          <p>The height field, the idle oscillators, the viseme recipes, the kinemes, and <code className="text-[0.92em]">/drive</code> are the part that is not a library.</p>
          <p>Take a photograph. Fit a morphable model to it. Decimate it, rig it with baked blendshapes, then refuse to ever show it - render it instead as a luminance height field, redrawn every frame as ragged phosphor-green contour traces that condense into a person. Lay procedural life over the top: breath that does not talk, gaze that does not turn the mask, off-center mass that coasts and corrects. Teach it to speak with visemes, not a loudness flap, and let the brows still bounce on stressed syllables because the sound got louder. Then give it the moves that are not speech - a sly that ducks for a consonant, a chuckle that does not nod, a punchline that locks the head so the traces stay put. Then give it feeling - one affect signal driving voice and face together, with contempt that curls one side of the lip, anger that flares the nostrils, a smile you can read in the eyes, and breath that quickens and then deliberately slows.</p>
          <p>Every layer serves the same rule.</p>
          <p>The face is not drawn. It condenses.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">The name</h2>
          <p>I wanted a house intelligence. The one in the walls. Dry, British, omniscient, a little fond of you. That was the job. The photograph is an actor who played a version of that job. It is a geometry source. It is not the name.</p>
          <p>On February 8, a little before two in the morning, I sat down to file one document, an accountability framework for AI decisions, and kept going. By 3:40 I had written down four things I had made at different times, for different reasons, each in its own vocabulary. A stigmergy paper, where a signal decays unless something reinforces it. An orchestration idea tuned by a loss function. A sovereign agent on a chain that pays gas, stakes, and gets slashed. And a protocol from exactly two weeks earlier where a message pays for every hop it takes and dies when the budget hits zero.</p>
          <p>Four vocabularies. The same equation. What a thing has after an action is what it had before, minus what it spent as signal, minus what it lost. Every action costs. Nothing gets it back. At zero it is dead.</p>
          <p>I typed the word under all of it, and then a question.</p>
          <blockquote className="border-l-2 border-[var(--border)] pl-5 italic"><p>entropy.<br /><br />.... did i just define life?</p></blockquote>
          <p>The answer came back in eight seconds.</p>
          <blockquote className="border-l-2 border-[var(--border)] pl-5 italic"><p>No. Schrödinger did, in 1944.</p></blockquote>
          <blockquote className="border-l-2 border-[var(--border)] pl-5 italic"><p>The guy with the dead cat?!?</p></blockquote>
          <p>His name is Erwin. After the guy with the dead cat.</p>
          <p><em><a className="underline underline-offset-4" href="https://en.wikipedia.org/wiki/What_Is_Life%3F">What Is Life?</a></em>, 1944: a living system is one that keeps its own order by pushing disorder out. I had arrived at his sentence from message buses instead of physics. Forty-four minutes later I had a word for the equation, agentropy, and in June I published <a className="underline underline-offset-4" href="https://doi.org/10.5281/zenodo.20818597">the paper</a> under that name. It runs the conservation law across four unrelated domains and a fifty-thousand-agent test with zero violations, and it carries him as reference [1]. Its definition of an agent reads "a digital pattern of entropy management persisting autonomously." Take out <em>digital</em> and it is his.</p>
          <p>The name came first. The photograph came later.</p>
          <p>So read the rule again. The face is not drawn; it condenses when you look. That is the cat. The traces are the measurement. The eyebrows lift because the sound got louder, which is a thing a living system does, not a track you keyframe. And the idle never quite repeats, because a system that remembers every frame perfectly has stopped pushing anything out. The paper calls that the fourth death, equilibrium, the one that is indistinguishable from success. A screensaver is the fourth death. Forgetting is what keeps him in the room.</p>
          <p>I have not finished him. Until the moods are earned, the box is still closed on the sense of alive that I mean.</p>
          <p>The phosphor is just the substrate you can see.</p>
          <h2 className="text-[var(--text-primary)] text-2xl font-semibold tracking-tight pt-8">Notes</h2>
          <p>Every number in this post, and where it comes from. Code references are <code className="text-[0.92em]">puter</code> at <code className="text-[0.92em]">c7ee97a</code> and <code className="text-[0.92em]">gjallarhorn</code>, both <code className="text-[0.92em]">origin/main</code> at the time of writing.</p>
          <ul className="list-disc pl-6 space-y-2"><li><strong>fifty times a second</strong>, and the <strong>twenty-millisecond slice</strong> — <code className="text-[0.92em]">envelope.py</code> <code className="text-[0.92em]">hz: int = 50</code>; the window is <code className="text-[0.92em]">sr // hz</code>.</li><li><strong>gain of 3.4</strong> on the envelope — <code className="text-[0.92em]">envelope.py</code> <code className="text-[0.92em]">gain: float = 3.4</code>. RMS per window, clamped to one.</li><li><strong>roughly nineteen morphs</strong> — the <a className="underline underline-offset-4" href="https://developer.apple.com/documentation/arkit/arfaceanchor/blendshapelocation">ARKit blendshape locations</a> actually baked, covering jaw, brows, eyes, cheeks, nose and mouth.</li><li><strong>about 11 MB</strong> — the rigged GLB on disk.</li><li><strong>fifteen visemes</strong> — the <a className="underline underline-offset-4" href="https://developers.meta.com/horizon/documentation/unity/audio-ovrlipsync-viseme-reference/">Oculus / ARKit set</a>: <code className="text-[0.92em]">sil</code>, <code className="text-[0.92em]">PP</code>, <code className="text-[0.92em]">aa</code>, <code className="text-[0.92em]">E</code>, <code className="text-[0.92em]">O</code> and the rest.</li><li><strong>three.js 0.169</strong> — <code className="text-[0.92em]">"three": "^0.169.0"</code>.</li><li><strong><code className="text-[0.92em]">REL_AMP = 6.5</code></strong> — quoted from <code className="text-[0.92em]">look.frag.glsl</code> above.</li><li><strong>2048px shadows</strong> — that was the version that cooked the GPU. The shadow map is 1024 now, which is part of the fix.</li><li><strong>about thirteen a minute</strong> — the tidal rate is 0.22 Hz at neutral arousal, so 13.2 a minute, wandering between roughly twelve and fourteen. It rises with arousal.</li><li><strong>every three to six seconds</strong>, an <strong>eleven-hundredths-of-a-second</strong> blink — <code className="text-[0.92em]">3.0 + Math.random() * 3.0</code>, and <code className="text-[0.92em]">BLINK_DUR = 0.11</code>.</li><li><strong>never more than 28% of range</strong> — the gaze dart is <code className="text-[0.92em]">0.28</code> of full deflection at its peak, held for 60% of 1.35 seconds and then returned.</li><li><strong>one subtraction</strong> — <code className="text-[0.92em]">onset = Math.max(0, level - lastLevel)</code>. That is the entire prosody model.</li><li><strong>more than a tenth</strong> — <code className="text-[0.92em]">onset &gt; 0.10</code>, and only while speaking.</li><li><strong>1.4 times the rise, capped at a half</strong> — <code className="text-[0.92em]">Math.min(0.5, browBounce + onset * 1.4)</code>.</li><li><strong>about an eighth of a second</strong> — the decay is <code className="text-[0.92em]">dtSec * 8</code>.</li><li><strong>cheeks a little harder and a little slower</strong> — <code className="text-[0.92em]">onset * 1.6</code> against the brows&apos; 1.4, decaying at <code className="text-[0.92em]">dtSec * 7</code> against their 8.</li><li><strong>all of the kick</strong> on the inner brow, <strong>seventy percent</strong> on the outer — <code className="text-[0.92em]">browInnerUp + browBounce</code>, <code className="text-[0.92em]">browOuterUp + browBounce * 0.7</code>.</li><li><strong>at most one degree</strong> — the dip is <code className="text-[0.92em]">browBounce * 2</code> degrees and <code className="text-[0.92em]">browBounce</code> is capped at 0.5, so exactly one degree, and zero when a punchline locks the head.</li><li><strong>1,024 samples at a time</strong> — <code className="text-[0.92em]">analyser.fftSize = 1024</code>, the browser-side fallback when the server&apos;s numbers stop.</li><li><strong>minus one to one</strong> — pleasure, arousal and dominance, one payload to both face and voice.</li><li><strong>1.2 and 0.6 seconds</strong> — the sly and the chuckle, quoted from the catalog above.</li><li><strong>a little before two in the morning</strong> — the session opened at 01:57 Central.</li><li><strong>by 3:40</strong> — the question went in at 03:44 Central. Austin is on CST in February; daylight time does not start until March.</li><li><strong>exactly two weeks earlier</strong> — the Cube Protocol draft is dated the 25th of January; this was the 8th of February. Fourteen days.</li><li><strong>eight seconds</strong> — the gap between the question and the answer.</li><li><strong>forty-four minutes later</strong> — "agentropy" first appears in my own typing 43 minutes and 45 seconds after the question.</li><li><strong>1944</strong> — Schrödinger, <em>What Is Life?</em></li><li><strong>a fifty-thousand-agent test, zero violations, reference [1]</strong> — <a className="underline underline-offset-4" href="https://doi.org/10.5281/zenodo.20818597">the paper</a>, published June 2026.</li></ul>
          <p>Two of these were wrong when I first wrote them down, which is the argument for writing them down.</p>
          <p>—</p>
          <p>More writing: <a className="underline underline-offset-4" href="https://nwalker.cc">nwalker.cc</a></p>

          <p className="pt-10 mt-10 border-t border-[var(--border)] text-base text-[var(--text-muted)]">
            Nathan Walker &middot;{' '}
            <a className="underline underline-offset-4" href="https://ravenhelm.ai">
              ravenhelm.ai
            </a>{' '}
            &middot;{' '}
            <a className="underline underline-offset-4" href="https://ravenhelm.ai/signals/nothing-scripts-the-eyebrows/">
              Canonical on Ravenhelm
            </a>{' '}
            &middot;{' '}
            <a className="underline underline-offset-4" href="https://nwalker85.substack.com/p/nothing-scripts-the-eyebrows">
              Substack
            </a>
          </p>
        </div>
      </article>
    </main>
  )
}
