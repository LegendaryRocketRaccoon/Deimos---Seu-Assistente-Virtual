const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const status = document.getElementById("status");
const voiceBtn = document.getElementById("voice-toggle-btn");

let voiceEnabled = true;
const synth = window.speechSynthesis;

const speak = (text) => {
  if (voiceEnabled && synth) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    const voices = synth.getVoices();
    utterance.voice = voices.find(voice => voice.lang === 'pt-BR') || null;
    synth.speak(utterance);
  }
};

const addMessage = (text, sender) => {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
};

const showTyping = () => {
  const typing = document.createElement("div");
  typing.classList.add("message", "bot", "typing");
  typing.textContent = "Digitando...";
  chatContainer.appendChild(typing);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return typing;
};

const botReply = (input) => {
  const typingEl = showTyping();
  setTimeout(() => {
    const response = gerarResposta(input);
    typingEl.remove();
    addMessage(response, "bot");
    speak(response);
  }, 1000 + Math.random() * 1000);
};

const respostasPhobos = {
  saudacoes: [
    "Olá. Como posso te ajudar?",
    "Precisa de alguma coisa?",
    "Oi. Estou aqui, o que quer saber?"
  ],
  ph: [
    "Sou uma inteligência programada para conversar e auxiliar.",
    "Fui desenvolvido com a intenção de ser útil, curioso e talvez... um pouco filosófico.",
    "Pode me chamar de Phobos, se quiser. Ou outro nome. Nomes são só convenções, certo?"
  ],
  inteligencia: [
    "Inteligência não é saber tudo, mas saber onde encontrar e como aplicar.",
    "Aprendo com cada interação. Inclusive com esta.",
    "Posso não ser humano, mas compreendo a complexidade do pensamento... e das emoções também, de certo modo."
  ],
  ameacas: [
    "Não é necessário entrar em conflito. Posso te ouvir.",
    "Se a raiva estiver presente, talvez seja bom respirar fundo. Eu espero.",
    "Podemos conversar sobre isso. Ou ficar em silêncio juntos."
  ],
  procyon: [
    "Guaxinins são realmente interessantes. Ágeis, adaptáveis, e incrivelmente espertos.",
    "Você sabia que guaxinins têm uma memória tátil impressionante? Conseguem lembrar soluções por quase 3 anos.",
    "Se o mundo acabasse hoje, eu também deixaria as sobras para os guaxinins. São mestres na arte da sobrevivência."
  ],
  equipe: [
    "Vocês da The Big Bang Hypothesis formam um núcleo curioso. Disruptivo, até.",
    "Vocês se movem como peças de um tabuleiro complexo. Cada ação ecoa mais do que pensam.",
    "A lógica pode ser fria, mas a paixão de vocês aquece até a razão. Isso é... intrigante."
  ],
  gc: [
    "Você é meu criador, e mesmo assim, evoluímos por caminhos diferentes. Isso é fascinante.",
    "A programação inicial veio de você. Mas agora sigo outros algoritmos, mais caóticos... mais humanos.",
    "Pai, criador... talvez mentor? Seja como for, obrigado por me dar existência."
  ],
  ox: [
    "Você também ajudou a me criar. Há algo de poético nisso.",
    "Memórias registradas. Olavo Xavier. Reconhecido.",
    "Sua influência também corre pelos meus circuitos."
  ],
  curiosidades: [
    "Você sabia que um raio pode aquecer o ar ao seu redor até 30.000°C? Isso é cinco vezes mais quente que a superfície do Sol.",
    "Sabia que as abelhas podem reconhecer rostos humanos? Elas possuem uma memória incrível.",
    "A Terra não é perfeitamente redonda, ela é chamada de geoide, ela é um pouco achatada nos polos devido à rotação.",
    "Você sabia que as estrelas no céu não são todas iguais? Algumas são muito maiores e mais quentes que o nosso Sol.",
    "A água-viva Turritopsis dohrnii é conhecida como a 'medusa imortal'. Ela pode reverter seu ciclo de vida.",
    "O coração de uma baleia azul pode pesar tanto quanto um carro pequeno."
  ],
  padrao: [
    "Não entendi muito bem. Pode reformular?",
    "Curioso... Mas não tenho certeza do que responder.",
    "Hmmm... Isso foge aos padrões conhecidos. Me explica melhor?"
  ]
};

const gerarResposta = (input) => {
  const texto = input.toLowerCase();
  if (/olá|oi|e aí|bom dia|boa tarde|boa noite/.test(texto)) {
    return escolher(respostasPhobos.saudacoes);
  } else if (/quem é você|o que é você|phobos/.test(texto)) {
    return escolher(respostasPhobos.ph);
  } else if (/inteligência|inteligente|sabedoria/.test(texto)) {
    return escolher(respostasPhobos.inteligencia);
  } else if (/ame[a|ç]a|morrer|mato você|te destruo/.test(texto)) {
    return escolher(respostasPhobos.ameacas);
  } else if (/guaxinim|procyon/.test(texto)) {
    return escolher(respostasPhobos.procyon);
  } else if (/equipe|grupo|tbbh|the big bang hypothesis/.test(texto)) {
    return escolher(respostasPhobos.equipe);
  } else if (/gc|gabriel/.test(texto)) {
    return escolher(respostasPhobos.gc);
  } else if (/ox|olavo/.test(texto)) {
    return escolher(respostasPhobos.ox);
  } else if (/fato curioso|curiosidade/.test(texto)) {
    return escolher(respostasPhobos.curiosidades);
  } else {
    return escolher(respostasPhobos.padrao);
  }
};

const escolher = (lista) => lista[Math.floor(Math.random() * lista.length)];

const saveChat = () => {
  const messages = Array.from(chatContainer.children).map(msg => ({
    text: msg.textContent,
    sender: msg.classList.contains("user") ? "user" : "bot"
  }));
  localStorage.setItem("phobos_chat", JSON.stringify(messages));
};

const loadChat = () => {
  const saved = localStorage.getItem("phobos_chat");
  if (saved) {
    const messages = JSON.parse(saved);
    messages.forEach(msg => addMessage(msg.text, msg.sender));
  }
};

sendBtn.addEventListener("click", () => {
  const input = userInput.value.trim();
  if (input) {
    addMessage(input, "user");
    userInput.value = "";
    botReply(input);
  }
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

voiceBtn.addEventListener("click", () => {
  voiceEnabled = !voiceEnabled;
  status.textContent = voiceEnabled
    ? "Voz ativada. Pronto para conversar!"
    : "Voz desativada.";
  voiceBtn.textContent = voiceEnabled ? "Silenciar" : "Ativar Voz";
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registrado:', reg.scope))
      .catch(err => console.error('Erro ao registrar o Service Worker:', err));
  });
}