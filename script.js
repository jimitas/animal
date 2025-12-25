// 動物データ
const animals = [
    { emoji: '🐶', name: 'イヌ' },
    { emoji: '🐱', name: 'ネコ' },
    { emoji: '🐭', name: 'ネズミ' },
    { emoji: '🐹', name: 'ハムスター' },
    { emoji: '🐰', name: 'ウサギ' },
    { emoji: '🦊', name: 'キツネ' },
    { emoji: '🐻', name: 'クマ' },
    { emoji: '🐼', name: 'パンダ' },
    { emoji: '🐨', name: 'コアラ' },
    { emoji: '🐯', name: 'トラ' },
    { emoji: '🦁', name: 'ライオン' },
    { emoji: '🐮', name: 'ウシ' },
    { emoji: '🐷', name: 'ブタ' },
    { emoji: '🐸', name: 'カエル' },
    { emoji: '🐵', name: 'サル' },
    { emoji: '🐔', name: 'ニワトリ' },
    { emoji: '🐧', name: 'ペンギン' },
    { emoji: '🐦', name: 'トリ' },
    { emoji: '🐤', name: 'ヒヨコ' },
    { emoji: '🦆', name: 'アヒル' },
    { emoji: '🦅', name: 'ワシ' },
    { emoji: '🦉', name: 'フクロウ' },
    { emoji: '🦇', name: 'コウモリ' },
    { emoji: '🐺', name: 'オオカミ' },
    { emoji: '🐗', name: 'イノシシ' },
    { emoji: '🐴', name: 'ウマ' },
    { emoji: '🦄', name: 'ユニコーン' },
    { emoji: '🐝', name: 'ミツバチ' },
    { emoji: '🐛', name: 'イモムシ' },
    { emoji: '🦋', name: 'チョウ' },
    { emoji: '🐌', name: 'カタツムリ' },
    { emoji: '🐞', name: 'テントウムシ' },
    { emoji: '🐜', name: 'アリ' },
    { emoji: '🦗', name: 'コオロギ' },
    { emoji: '🐢', name: 'カメ' },
    { emoji: '🐍', name: 'ヘビ' },
    { emoji: '🦎', name: 'トカゲ' },
    { emoji: '🦖', name: '恐竜' },
    { emoji: '🐙', name: 'タコ' },
    { emoji: '🦑', name: 'イカ' },
    { emoji: '🦐', name: 'エビ' },
    { emoji: '🦀', name: 'カニ' },
    { emoji: '🐡', name: 'フグ' },
    { emoji: '🐠', name: '熱帯魚' },
    { emoji: '🐟', name: 'サカナ' },
    { emoji: '🐬', name: 'イルカ' },
    { emoji: '🐳', name: 'クジラ' },
    { emoji: '🐋', name: 'シロナガスクジラ' },
    { emoji: '🦈', name: 'サメ' },
    { emoji: '🐊', name: 'ワニ' },
    { emoji: '🐅', name: 'トラ（縞）' },
    { emoji: '🐆', name: 'ヒョウ' },
    { emoji: '🦓', name: 'シマウマ' },
    { emoji: '🦍', name: 'ゴリラ' },
    { emoji: '🦧', name: 'オランウータン' },
    { emoji: '🐪', name: 'ヒトコブラクダ' },
    { emoji: '🐫', name: 'フタコブラクダ' },
    { emoji: '🦒', name: 'キリン' },
    { emoji: '🦘', name: 'カンガルー' },
    { emoji: '🦏', name: 'サイ' },
    { emoji: '🐘', name: 'ゾウ' }
];

// ゲーム状態
let currentQuestion = 0;
let score = 0;
let totalQuestions = 10;
let usedAnimals = [];
let currentAnimal = null;
let gameQuestions = [];

// DOM要素
const silhouetteEl = document.getElementById('silhouette');
const optionsEl = document.getElementById('options');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');
const gameOverEl = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');
const finalTotalEl = document.getElementById('finalTotal');
const restartBtn = document.getElementById('restartBtn');
const quizArea = document.querySelector('.quiz-area');

// ゲーム初期化
function initGame() {
    currentQuestion = 0;
    score = 0;
    usedAnimals = [];
    gameQuestions = [];

    // ランダムに問題を選択
    const shuffled = [...animals].sort(() => Math.random() - 0.5);
    gameQuestions = shuffled.slice(0, totalQuestions);

    updateScore();
    totalEl.textContent = totalQuestions;
    gameOverEl.style.display = 'none';
    quizArea.style.display = 'block';

    loadQuestion();
}

// 問題を読み込む
function loadQuestion() {
    if (currentQuestion >= totalQuestions) {
        endGame();
        return;
    }

    currentAnimal = gameQuestions[currentQuestion];

    // シルエットを表示
    silhouetteEl.textContent = currentAnimal.emoji;
    silhouetteEl.classList.remove('revealed');

    // 選択肢を生成
    generateOptions();

    // UIをリセット
    resultEl.textContent = '';
    resultEl.className = 'result';
    nextBtn.style.display = 'none';

    // 進捗を更新
    currentEl.textContent = currentQuestion + 1;
}

// 選択肢を生成
function generateOptions() {
    // 正解以外の動物をランダムに3つ選択
    const wrongOptions = animals
        .filter(a => a.name !== currentAnimal.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    // 正解と不正解を混ぜてシャッフル
    const allOptions = [currentAnimal, ...wrongOptions]
        .sort(() => Math.random() - 0.5);

    // ボタンを生成
    optionsEl.innerHTML = '';
    allOptions.forEach(animal => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = animal.name;
        button.onclick = () => checkAnswer(animal, button);
        optionsEl.appendChild(button);
    });
}

// 回答をチェック
function checkAnswer(selectedAnimal, button) {
    // すべてのボタンを無効化
    const allButtons = optionsEl.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    // シルエットを表示
    silhouetteEl.classList.add('revealed');

    if (selectedAnimal.name === currentAnimal.name) {
        // 正解
        button.classList.add('correct');
        resultEl.textContent = '正解！';
        resultEl.className = 'result correct';
        score++;
        updateScore();
    } else {
        // 不正解
        button.classList.add('wrong');
        resultEl.textContent = `不正解... 正解は「${currentAnimal.name}」でした`;
        resultEl.className = 'result wrong';

        // 正解のボタンをハイライト
        allButtons.forEach(btn => {
            if (btn.textContent === currentAnimal.name) {
                btn.classList.add('correct');
            }
        });
    }

    // 次へボタンを表示
    nextBtn.style.display = 'inline-block';
}

// スコアを更新
function updateScore() {
    scoreEl.textContent = score;
}

// 次の問題へ
function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

// ゲーム終了
function endGame() {
    quizArea.style.display = 'none';
    gameOverEl.style.display = 'block';
    finalScoreEl.textContent = score;
    finalTotalEl.textContent = totalQuestions;
}

// イベントリスナー
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', initGame);

// ゲーム開始
initGame();
