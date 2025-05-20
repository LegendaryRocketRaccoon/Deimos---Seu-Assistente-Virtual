document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.getElementById("chat-container");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const status = document.getElementById("status");
  const voiceBtn = document.getElementById("voice-toggle-btn");
  const jogosBtn = document.getElementById("jogos-btn");

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
    msg.innerHTML = text;
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

  const botReply = async (input) => {
  const typingEl = showTyping();

  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  const response = await gerarResposta(input);
  typingEl.remove();
  addMessage(response, "bot");
  speak(response);
};

  jogosBtn.addEventListener("click", () => {
    const typingEl = showTyping();
    setTimeout(() => {
      typingEl.remove();
      addMessage(mostrarMenuJogosComLinks(), "bot");
    }, 500);
  });

  const mostrarMenuJogosComLinks = () => {
  return `
    Escolha um dos jogos abaixo:<br><br>
    <div style="display:flex; flex-direction:column; gap:8px;">
      <a href="https://theapplejuicer.github.io/Mate-O-Dragao/" target="_blank">1. Mate o Dragão</a>
      <a href="https://legendaryrocketraccoon.github.io/Pac-Man-Test/" target="_blank">Deimos - Pac-Man Test</a>
    </div>
  `;
};

  const musicasBtn = document.getElementById("musicas-btn");

  musicasBtn.addEventListener("click", () => {
    const typingEl = showTyping();
    setTimeout(() => {
      typingEl.remove();
      addMessage(mostrarMenuMusicas(), "bot");
    }, 500);
  });

  const mostrarMenuMusicas = () => {
    return `
      Escolha uma música para ouvir:<br><br>
  <button onclick="tocarMusica('musicas/11th Street Kidzz.mp3')">11th Street Kidzz</button><br><br>
  <button onclick="tocarMusica('musicas/AC_DC - Thunderstruck (Official Video).mp3')">AC_DC - Thunderstruck</button><br><br>
  <button onclick="tocarMusica('musicas/Creep.mp3')">Creep</button><br><br>
      <button onclick="tocarMusica('musicas/Glen Campbell - Southern Nights (Official Audio).mp3')">Glen Campbell - Southern Nights</button><br><br>
      <button onclick="tocarMusica('musicas/Heartbreaker (Remastered).mp3')">Heartbreaker</button><br><br>
      <button onclick="tocarMusica('musicas/Locomotive Breath (2001 Remaster).mp3')">Locomotive Breath (2001 Remaster)</button><br><br>
      <button onclick="tocarMusica('musicas/Nirvana - Something In The Way (Audio).mp3')">Nirvana - Something In The Way</button><br><br>
      <button onclick="tocarMusica('musicas/Sunshine (Adagio in D Minor).mp3')">Adagio in D Minor</button><br><br>

      
      Ou escolha sua própria música:<br>
      <input type="file" accept="audio/*" onchange="carregarMusicaUsuario(event)"><br><br>
  
      <div id="music-player-container" style="display:none; margin-top:10px;">
        <button onclick="fecharPlayer()" style="float:right;">X</button>
        <audio id="music-player" controls></audio>
      </div>
    `;
  };

  const audio = document.getElementById("music-player");

  window.tocarMusica = (src) => {
    const audio = document.getElementById("music-player");
    const container = document.getElementById("music-player-container");
    audio.src = src;
    audio.play();
    container.style.display = "block";
  };

  window.carregarMusicaUsuario = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const audio = document.getElementById("music-player");
      const container = document.getElementById("music-player-container");
      audio.src = url;
      audio.play();
      container.style.display = "block";
    }
  };

  window.fecharPlayer = () => {
    const audio = document.getElementById("music-player");
    const container = document.getElementById("music-player-container");
    audio.pause();
    audio.src = "";
    container.style.display = "none";
  };

  const tentarResolverMatematica = (texto) => {
    try {
      if (/^[0-9+\-*/().\s]+$/.test(texto)) {
        const resultado = eval(texto);
        return `O resultado é ${resultado}`;
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const extrasBtn = document.getElementById("extras-btn");

  extrasBtn.addEventListener("click", () => {
    const typingEl = showTyping();
    setTimeout(() => {
      typingEl.remove();
      addMessage(mostrarMenuExtras(), "bot");
    }, 500);
  });

  const mostrarMenuExtras = () => {
    return `
    Aqui estão alguns programas extras que você pode explorar:<br><br>
    <div style="display:flex; flex-direction:column; gap:8px;">
      <a href="https://legendaryrocketraccoon.github.io/Agendamento_de_Laboratorios/" target="_blank">Agendamento de Laboratórios SENAI</a>
      <a href="https://legendaryrocketraccoon.github.io/Sorteio_Nomes/" target="_blank">Sorteio de Nomes SENAI</a>
      <a href="https://soundtracksfase1.netlify.app/" target="_blank">Soundtracks Test</a>
    </div>
  `;
  };

  const traduzirTexto = async (texto, idiomaAlvo) => {
  const langCode = {
    inglês: "en",
    espanhol: "es",
    francês: "fr",
    alemão: "de",
    italiano: "it",
    português: "pt",
  }[idiomaAlvo.toLowerCase()];

  if (!langCode) return `Desculpe, não conheço o idioma "${idiomaAlvo}".`;

  const origem = "pt";

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${origem}|${langCode}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    const traducao = dados.responseData.translatedText;

    if (traducao && traducao.toLowerCase() !== texto.toLowerCase()) {
      return `A tradução de "${texto}" para ${idiomaAlvo} é: ${traducao}`;
    } else {
      return `Não consegui traduzir "${texto}" para ${idiomaAlvo}.`;
    }
  } catch (e) {
    console.error("Erro:", e);
    return "Ocorreu um erro ao tentar traduzir.";
  }
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
      "Pode me chamar de Deimos, se quiser. Ou outro nome. Nomes são só convenções, certo?"
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
    piadas: [
      "Feynman, Einstein e Schrodinger entram em um bar. Feynman diz: 'Parece que estamos dentro de uma piada.' Einstein responde: 'Mas só para um observador que nos viu entrando juntos.' Schrodinger diz: 'Se há alguém olhando na janela, estou indo embora.'"
    ],
    procyon: [
      "Guaxinins, também conhecidos como Procyon lotor, são mamíferos noturnos nativos da América do Norte. Dotados de inteligência surpreendente, são conhecidos por suas patas dianteiras incrivelmente habilidosas, capazes de abrir potes, portas e até resolver quebra-cabeças simples. Seu comportamento curioso e adaptabilidade os tornaram especialistas em sobreviver em áreas urbanas.",
      "Há quem diga que os guaxinins 'lavam' a comida, mas na verdade, eles usam as patas sensíveis para explorar objetos em ambientes úmidos, aumentando sua percepção tátil."
    ],
    padrao: [
      "Não entendi muito bem. Pode reformular?",
      "Curioso... Mas não tenho certeza do que responder.",
      "Hmmm... Isso foge aos padrões conhecidos. Me explica melhor?"
    ]
  };

  const gerarResposta = async (input) => {
  const texto = input.toLowerCase().replace(',', '.');

  const respostaMatematica = tentarResolverMatematica(texto);
  if (respostaMatematica) return respostaMatematica;
  if (texto.includes("jogar")) return mostrarMenuJogosComLinks();

  if (/^\d+$/.test(texto)) return "Número detectado.";

  if (texto.startsWith("traduza") || texto.startsWith("traduz")) {
  const match = texto.match(/traduz(?:a)? (.+?) para (.+)/i);
  if (!match || match.length < 3) {
    return "Por favor, diga algo como: 'Traduza bom dia para inglês'.";
  }
  return await traduzirTexto(match[1], match[2]);
}

    if (/olá|oi|e aí|bom dia|boa tarde|boa noite/.test(texto)) {
      return escolher(respostasPhobos.saudacoes);
    } else if (/quem é você|o que é você|deimos/.test(texto)) {
      return escolher(respostasPhobos.ph);
    } else if (/inteligência|inteligente|sabedoria/.test(texto)) {
      return escolher(respostasPhobos.inteligencia);
    } else if (/ame[a|ç]a|morrer|mato você|te destruo/.test(texto)) {
      return escolher(respostasPhobos.ameacas);
    } else if (/piada|algo engraçado|me faça rir/.test(texto)) {
      return escolher(respostasPhobos.piadas);
    } else if (/guaxinim|procyon|guaxinins/.test(texto)) {
      return escolher(respostasPhobos.procyon);
    } else if (/tbbh|the big bang hypothesis/.test(texto)) {
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
    localStorage.setItem("deimos_chat", JSON.stringify(messages));
  };

  const loadChat = () => {
    const saved = localStorage.getItem("deimos_chat");
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
    if (e.key === "Enter") sendBtn.click();
  });

  voiceBtn.addEventListener("click", () => {
    voiceEnabled = !voiceEnabled;
    status.textContent = voiceEnabled ? "Voz ativada. Pronto para conversar!" : "Voz desativada.";
    voiceBtn.textContent = voiceEnabled ? "Silenciar" : "Ativar Voz";
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker registrado:', reg.scope))
        .catch(err => console.error('Erro ao registrar o Service Worker:', err));
    });
  }
});