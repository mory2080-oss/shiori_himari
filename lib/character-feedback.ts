import type { CharacterFeedback, FeedbackType } from "./types";

const CHARACTER_IMAGES = {
  "no-progress":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-19-tqA3eW1JyAzuRsmtCIUnK5pwRA6Pe7.jpg",
  "small-progress":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-20-bDOgWYPzjzBxVKCSWLVk0oTWGhpo9q.jpg",
  "medium-progress":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-13-QdnwMXQz9mgNqDuXsaGzLpHxDAT7QK.jpg",
  "great-progress":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-25-EJrrqFy8UguAODEEjWn55S4CBF2cfP.jpg",
  "almost-done":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-25-EJrrqFy8UguAODEEjWn55S4CBF2cfP.jpg",
  completed:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-18-Y8bMITv9fg2vd8vRE1OXFxe6aFJDNr.jpg",
  default:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-19-tqA3eW1JyAzuRsmtCIUnK5pwRA6Pe7.jpg",
};

// 進捗状況に応じた複数のメッセージバリエーション（ひまりの優しい性格）
const FEEDBACK_MESSAGES: Record<FeedbackType, string[]> = {
  "no-progress": [
    "まだ始まっていないんですね。大丈夫、焦らなくていいんですよ。今日1ページだけ、一緒に読んでみませんか？",
    "読書って、始めるまでが一番大変ですよね。でも、ほんの少しでいいんです。私が見守っていますね。",
    "本を開くのが億劫な日もありますよね。でも、1行だけでも読めたら、それは立派な一歩ですよ。",
    "読書の習慣は、小さな一歩から始まります。今日、ほんの5分だけ試してみませんか？",
    "無理しなくていいんですよ。でも、本の世界には素敵な発見が待っています。一緒に覗いてみましょう？",
  ],
  "small-progress": [
    "わあ、読み始めたんですね！その一歩がとても大切なんですよ。このまま、ゆっくり続けていきましょうね。",
    "素敵です！少しずつでも読み進めているんですね。継続は力なり、ですよ。",
    "始められましたね。読書の習慣は、こうした小さな積み重ねから生まれるんです。",
    "いい調子ですね。毎日少しずつ...それが一番の近道なんですよ。",
    "読み始めの頃って、ワクワクしますよね。その気持ちを大切にしてくださいね。",
  ],
  "medium-progress": [
    "順調に進んでいますね！読書が日常の一部になってきているのが伝わります。とても嬉しいです。",
    "半分近くまで来ましたね。物語の世界に浸れていますか？この調子で、ゆっくり楽しんでくださいね。",
    "着実に読み進めていますね。読書の習慣がしっかり身についてきている証拠ですよ。",
    "中盤に差し掛かりましたね。きっと物語も盛り上がってきている頃でしょう。楽しんでくださいね。",
    "いいペースですね。無理せず、自分のリズムで読み進めるのが一番ですよ。",
  ],
  "great-progress": [
    "すごい進み具合ですね！読書が楽しくなってきているのではないですか？とても嬉しいです。",
    "素晴らしいですね。こんなに読み進められるなんて、読書習慣がしっかり身についていますよ。",
    "終盤に近づいてきましたね。結末が気になって仕方ないのでは？楽しんでくださいね。",
    "とても良いペースです。読書を楽しむ心、これからもずっと大切にしてくださいね。",
    "ここまで読み進められるって、本当に素敵なことですよ。私も嬉しくなっちゃいます。",
  ],
  "almost-done": [
    "もうすぐ読み終わりますね。最後まで読み切る喜び、一緒に味わいましょうね。",
    "あと少しですね。ここまで来たあなた、本当に頑張りましたね。ゆっくり結末を楽しんでください。",
    "クライマックスですね。どんな結末が待っているのか...ワクワクしますね。",
    "最後まであと少し。読み切った時の達成感は、きっと次の本への力になりますよ。",
    "フィニッシュ目前ですね。この経験が、これからの読書習慣の土台になりますよ。",
  ],
  completed: [
    "おめでとうございます！一冊読み切りましたね。この達成感、ぜひ次の本にも繋げてくださいね。",
    "読了、おめでとうございます！あなたの読書習慣、しっかり育ってきていますね。とても嬉しいです。",
    "素晴らしいです！最後まで読み切る力、それが読書習慣の証ですよ。次はどんな本を読みますか？",
    "一冊読み終えましたね。この経験が、あなたの心に素敵な種を蒔いたはずです。",
    "完読おめでとうございます！読書を続けることで、どんどん世界が広がっていきますよ。",
  ],
};

// ランダムにメッセージを選択する関数
function getRandomMessage(type: FeedbackType): string {
  const messages = FEEDBACK_MESSAGES[type];
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

// 進捗率を細かく判定してFeedbackTypeを決定
function determineFeedbackType(progress: number, isCompleted: boolean): FeedbackType {
  if (isCompleted) {
    return "completed";
  }
  
  if (progress === 0) {
    return "no-progress";
  }
  
  if (progress >= 1 && progress <= 15) {
    return "small-progress";
  }
  
  if (progress >= 16 && progress <= 50) {
    return "medium-progress";
  }
  
  if (progress >= 51 && progress <= 85) {
    return "great-progress";
  }
  
  // 86% 以上
  return "almost-done";
}

export function getCharacterFeedback(
  progress: number,
  isCompleted: boolean
): CharacterFeedback {
  const type = determineFeedbackType(progress, isCompleted);

  return {
    type,
    message: getRandomMessage(type),
    imageUrl: CHARACTER_IMAGES[type],
  };
}

export function getDefaultCharacterImage(): string {
  return CHARACTER_IMAGES.default;
}
