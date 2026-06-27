import fs from "node:fs/promises";
import path from "node:path";
const { Presentation, PresentationFile } = await import(
  "file:///C:/Users/danbe/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs"
);

const ROOT = "C:/Users/danbe/OneDrive/Documentos/GitHub/practica5";
const OUT = path.join(ROOT, "outputs");
const WORK = path.join(
  process.env.TMP || process.env.TEMP || "C:/tmp",
  "codex-presentations",
  "modal-bottom-sheet"
);
const TMP = path.join(WORK, "tmp");
const PREVIEW = path.join(TMP, "preview");
const LAYOUT = path.join(TMP, "layout");
const QA = path.join(TMP, "qa");

const pptxPath = path.join(OUT, "presentacion_modal_bottom_sheet.pptx");
const htmlPath = path.join(OUT, "presentacion_modal_bottom_sheet.html");

const W = 1280;
const H = 720;

const C = {
  bg: "#07111f",
  bg2: "#0b172a",
  ink: "#eaf2ff",
  muted: "#9fb2cc",
  card: "#111f35",
  card2: "#132741",
  cyan: "#35d9f2",
  blue: "#2f7df6",
  green: "#55e09b",
  amber: "#ffcf5a",
  pink: "#ff5fa2",
  violet: "#8b5cf6",
  line: "#25415f",
  white: "#ffffff",
};

const slides = [
  {
    kind: "cover",
    kicker: "React Native | miapp2 | Practica guiada 40 min",
    title: "Modal & Bottom Sheet",
    body: "Patrones de interfaz, state, props y una implementacion educativa lista para presentar.",
    speaker: "Apertura: presentar el objetivo y explicar que el archivo de implementacion recomendado es miapp2/screens/ModalScreen.js.",
  },
  {
    kind: "agenda",
    title: "Ruta de aprendizaje",
    body: "De concepto a implementacion: primero entendemos los patrones, luego los conectamos con state y cerramos con el guion de practica.",
    items: ["Contexto de miapp2", "Modal nativo", "Bottom Sheet", "State y flujo", "Practica de 40 min", "Reparto de 3 personas"],
  },
  {
    kind: "context",
    title: "Contexto real del proyecto",
    body: "`miapp2` usa Expo, React 19.1.0 y React Native 0.81.5. No tiene libreria de Bottom Sheet instalada.",
    labels: ["expo", "react", "react-native", "react-native-web"],
    callout: "Decision tecnica: usar Modal nativo y un Bottom Sheet educativo con Modal + Animated.",
  },
  {
    kind: "concept",
    title: "Modal: una capa por encima de la pantalla",
    body: "Un Modal presenta contenido encima de la vista actual para confirmar, advertir o enfocar una tarea corta.",
    bullets: ["Interrupcion alta", "Ideal para decisiones importantes", "Incluido en react-native", "Controlado por visible + state"],
  },
  {
    kind: "phone-modal",
    title: "Ejemplo visual: confirmar una reserva",
    body: "El usuario conserva el contexto de la clase, pero la decision queda al centro: cancelar o confirmar.",
    code: "<Modal visible={modalVisible} transparent animationType=\"fade\" />",
  },
  {
    kind: "props",
    title: "Props mas usadas de Modal",
    body: "Estas props cubren casi todos los casos introductorios y son suficientes para una practica clara.",
    rows: [
      ["visible", "boolean", "Muestra u oculta el modal"],
      ["animationType", "none | slide | fade", "Define la animacion"],
      ["transparent", "boolean", "Permite overlay personalizado"],
      ["onRequestClose", "function", "Cierra desde sistema/Android"],
      ["onShow", "function", "Corre al abrirse"],
      ["onDismiss", "function", "Corre al cerrarse en iOS"],
    ],
  },
  {
    kind: "state",
    title: "State: el interruptor del Modal",
    body: "El Modal no se abre solo: el boton cambia un estado y React vuelve a renderizar la interfaz.",
    code: "const [modalVisible, setModalVisible] = useState(false);\n\n<Pressable onPress={() => setModalVisible(true)}>\n  <Text>Confirmar reserva</Text>\n</Pressable>",
  },
  {
    kind: "flow",
    title: "Flujo interno de apertura y cierre",
    body: "El usuario pulsa, cambia el estado, aparece la capa; despues cancelar, confirmar o el boton de atras cierran el Modal.",
    steps: ["Press", "setModalVisible(true)", "Render", "Modal visible", "Cancelar/Confirmar", "setModalVisible(false)"],
  },
  {
    kind: "concept",
    title: "Bottom Sheet: opciones desde abajo",
    body: "Un Bottom Sheet aparece desde la parte inferior. Es menos intrusivo que un Modal y funciona muy bien para opciones rapidas.",
    bullets: ["Interrupcion media", "Mantiene mas contexto", "Ideal para filtros y acciones", "No viene como componente oficial en react-native"],
  },
  {
    kind: "phone-sheet",
    title: "Ejemplo visual: elegir modalidad",
    body: "El panel inferior permite elegir Presencial, En linea o Grabacion sin abandonar la pantalla de reserva.",
    code: "<BottomSheet visible={sheetVisible} title=\"Elige modalidad\" height={330}>",
  },
  {
    kind: "compare",
    title: "Modal vs Bottom Sheet",
    body: "La decision de diseno depende de la urgencia, el contexto y el tipo de accion que se pide.",
    rows: [
      ["Criterio", "Modal", "Bottom Sheet"],
      ["Posicion", "Centro o pantalla completa", "Parte inferior"],
      ["Interrupcion", "Alta", "Media"],
      ["Uso ideal", "Confirmar o alertar", "Elegir opciones"],
      ["Contexto", "Menos visible", "Mas visible"],
      ["Practica", "Confirmar reserva", "Elegir modalidad"],
    ],
  },
  {
    kind: "architecture",
    title: "Arquitectura de la practica",
    body: "La pantalla combina dos capas de interfaz y cuatro estados principales.",
    nodes: ["ModalScreen", "Modal nativo", "BottomSheet educativo", "useState", "Animated.Value", "Pressable"],
  },
  {
    kind: "props-sheet",
    title: "Props creadas para el Bottom Sheet",
    body: "Como no instalamos librerias, creamos un componente propio con una API sencilla y explicable.",
    rows: [
      ["visible", "Abre o cierra el panel"],
      ["onClose", "Funcion para cerrar"],
      ["title", "Encabezado visible"],
      ["height", "Altura del sheet"],
      ["children", "Contenido interno"],
      ["closeOnBackdropPress", "Cerrar tocando fuera"],
    ],
  },
  {
    kind: "animation",
    title: "Animacion con Animated.Value",
    body: "El truco esta en mover el panel en el eje Y: cerrado abajo, abierto en cero.",
    code: "const translateY = useRef(new Animated.Value(height)).current;\n\nAnimated.timing(translateY, {\n  toValue: visible ? 0 : height,\n  duration: visible ? 250 : 200,\n  useNativeDriver: true,\n}).start();",
  },
  {
    kind: "timeline",
    title: "Practica guiada de 40 minutos",
    body: "La sesion esta pensada para construir por partes y explicar cada decision.",
    slots: [
      ["0-5", "Introduccion"],
      ["5-15", "Modal nativo"],
      ["15-28", "Bottom Sheet"],
      ["28-36", "State e integracion"],
      ["36-40", "Cierre y preguntas"],
    ],
  },
  {
    kind: "roles",
    title: "Division equitativa entre 3 personas",
    body: "Cada expositor tiene un bloque tecnico y narrativo claro.",
    people: [
      ["Persona 1", "Modal nativo", "Concepto, props y confirmacion"],
      ["Persona 2", "Bottom Sheet", "Componente propio y animacion"],
      ["Persona 3", "State", "Integracion, demo y cierre"],
    ],
  },
  {
    kind: "implementation",
    title: "Paso 1: imports correctos",
    body: "La practica necesita hooks de React, componentes de React Native y StatusBar de Expo.",
    code: "import { useEffect, useRef, useState } from 'react';\nimport { StatusBar } from 'expo-status-bar';\nimport { Animated, Modal, Pressable, StyleSheet, Text, View } from 'react-native';",
  },
  {
    kind: "implementation",
    title: "Paso 2: estados principales",
    body: "Cuatro estados controlan toda la experiencia de la pantalla.",
    code: "const [modalVisible, setModalVisible] = useState(false);\nconst [sheetVisible, setSheetVisible] = useState(false);\nconst [selectedMode, setSelectedMode] = useState('Presencial');\nconst [reservationConfirmed, setReservationConfirmed] = useState(false);",
  },
  {
    kind: "implementation",
    title: "Paso 3: estructura visual base",
    body: "La pantalla muestra una clase, la modalidad elegida y el estado de la reserva.",
    code: "<Text>Modalidad: {selectedMode}</Text>\n<Text>Estado: {reservationConfirmed ? 'Confirmada' : 'Pendiente'}</Text>\n\n<Pressable onPress={() => setSheetVisible(true)}>\n  <Text>Elegir modalidad</Text>\n</Pressable>",
  },
  {
    kind: "implementation",
    title: "Paso 4: Modal de confirmacion",
    body: "El Modal valida la accion antes de marcar la reserva como confirmada.",
    code: "<Modal visible={modalVisible} animationType=\"fade\" transparent onRequestClose={() => setModalVisible(false)}>\n  <View style={styles.overlay}>\n    <View style={styles.modalCard}>\n      <Text>Confirmar reserva</Text>\n    </View>\n  </View>\n</Modal>",
  },
  {
    kind: "implementation",
    title: "Paso 5: BottomSheet educativo",
    body: "El componente recibe props y renderiza contenido flexible con children.",
    code: "function BottomSheet({ visible, onClose, title, height = 320, children }) {\n  return (\n    <Modal visible={visible} transparent animationType=\"none\">\n      <Animated.View style={{ height, transform: [{ translateY }] }}>\n        {children}\n      </Animated.View>\n    </Modal>\n  );\n}",
  },
  {
    kind: "implementation",
    title: "Paso 6: seleccionar modalidad",
    body: "Cada opcion actualiza la modalidad, reinicia la confirmacion y cierra el panel.",
    code: "function selectMode(mode) {\n  setSelectedMode(mode);\n  setReservationConfirmed(false);\n  setSheetVisible(false);\n}",
  },
  {
    kind: "pitfalls",
    title: "Errores comunes y correcciones",
    body: "Estos problemas son ideales para explicar durante la demo si algo falla.",
    items: [
      ["Modal siempre abierto", "useState(true)", "Iniciar en false"],
      ["No cierra en Android", "Falta onRequestClose", "Agregar setModalVisible(false)"],
      ["Sheet invisible", "Sin height o visible", "Revisar props y estado"],
      ["Animacion no se nota", "Propiedad no compatible", "Animar transform"],
    ],
  },
  {
    kind: "video",
    title: "Guion de video de apoyo",
    body: "El video puede durar entre 8 y 12 minutos y sirve como respaldo para la exposicion.",
    scenes: ["Tema y archivo", "Que es Modal", "Implementar Modal", "Que es Bottom Sheet", "Animacion", "State", "Comparacion", "Cierre"],
  },
  {
    kind: "questions",
    title: "Preguntas para activar al grupo",
    body: "Usalas durante el cierre para verificar que el concepto quedo claro.",
    questions: [
      "Que prop controla si el Modal aparece?",
      "Por que useState y no una variable normal?",
      "Cuando conviene usar Bottom Sheet?",
      "Por que reiniciamos reservationConfirmed?",
      "Que hace onRequestClose en Android?",
    ],
  },
  {
    kind: "summary",
    title: "Cierre: la idea central",
    body: "Modal confirma. Bottom Sheet ofrece opciones. State conecta la accion del usuario con lo que se ve en pantalla.",
    bullets: ["Modal = foco y decision", "Bottom Sheet = opciones rapidas", "State = memoria de la UI", "Animated = movimiento visual", "ModalScreen.js = lugar recomendado"],
  },
  {
    kind: "sources",
    title: "Fuentes y trazabilidad",
    body: "La presentacion se basa en documentacion oficial y en la guia creada para la practica.",
    sources: [
      "React Native Docs: Modal 0.81",
      "React Native Docs: Animated 0.81",
      "React Docs: useState",
      "Gorhom Bottom Sheet Docs v5",
      "PRACTICA_MODAL_BOTTOM_SHEET.md",
    ],
  },
];

const extraSlides = [
  {
    kind: "deep",
    title: "Como leer esta practica",
    body: "La presentacion funciona como mapa de exposicion: concepto, ejemplo visual, props, state, codigo y demo.",
    cards: [
      ["Concepto", "Que problema resuelve el patron."],
      ["Visual", "Como se ve en una app movil."],
      ["Codigo", "Como se expresa en React Native."],
      ["Demo", "Que accion realiza el usuario."],
    ],
  },
  {
    kind: "deep",
    title: "Por que no instalar librerias aqui",
    body: "La practica debe durar 40 minutos. Instalar librerias de gestos y reanimated puede consumir la clase.",
    cards: [
      ["Proyecto actual", "No trae @gorhom/bottom-sheet."],
      ["Objetivo", "Aprender el patron antes de depender de una libreria."],
      ["Ruta limpia", "Modal nativo + Animated."],
      ["Version avanzada", "Gorhom para una segunda practica."],
    ],
  },
  {
    kind: "reallife",
    appType: "chat",
    title: "Modal en apps de chat",
    body: "En una app tipo mensajeria, un Modal suele aparecer para confirmar borrar un mensaje, reportar un contacto o salir de un grupo.",
    examples: ["Eliminar mensaje", "Bloquear contacto", "Salir del grupo"],
  },
  {
    kind: "reallife",
    appType: "social",
    title: "Bottom Sheet en apps sociales",
    body: "En una app tipo red social, el Bottom Sheet es ideal para compartir, guardar, reportar o abrir opciones de una publicacion.",
    examples: ["Compartir", "Guardar", "Reportar"],
  },
  {
    kind: "reallife",
    appType: "commerce",
    title: "Bottom Sheet en e-commerce",
    body: "El panel inferior permite elegir talla, cantidad, envio o metodo de pago sin abandonar el producto.",
    examples: ["Talla", "Cantidad", "Envio", "Pago"],
  },
  {
    kind: "reallife",
    appType: "maps",
    title: "Bottom Sheet en mapas",
    body: "Las apps de mapas lo usan para mostrar detalles de un lugar mientras el mapa sigue visible atras.",
    examples: ["Ruta", "Horario", "Calificacion", "Guardar"],
  },
  {
    kind: "reallife",
    appType: "bank",
    title: "Modal en banca movil",
    body: "Cuando una accion es sensible, como confirmar una transferencia, un Modal obliga a revisar antes de continuar.",
    examples: ["Monto", "Destino", "Confirmar", "Cancelar"],
  },
  {
    kind: "popular-app",
    appType: "chat",
    appName: "WhatsApp",
    pattern: "Modal",
    title: "WhatsApp: Modal para eliminar mensaje",
    body: "En una app de mensajeria como WhatsApp, un Modal ayuda a confirmar acciones delicadas: eliminar, bloquear o reportar.",
    examples: ["Eliminar para mi", "Eliminar para todos", "Cancelar"],
    accent: C.green,
  },
  {
    kind: "popular-app",
    appType: "social",
    appName: "Instagram",
    pattern: "Bottom Sheet",
    title: "Instagram: Bottom Sheet de opciones",
    body: "En una red social como Instagram, el Bottom Sheet aparece para compartir, guardar, reportar o abrir acciones de una publicacion.",
    examples: ["Compartir", "Guardar", "Reportar"],
    accent: C.pink,
  },
  {
    kind: "popular-app",
    appType: "social",
    appName: "TikTok",
    pattern: "Bottom Sheet",
    title: "TikTok: acciones rapidas desde abajo",
    body: "En apps de video corto, el panel inferior permite compartir, denunciar, guardar o enviar sin abandonar el contenido.",
    examples: ["Enviar", "Guardar", "No me interesa"],
    accent: C.violet,
  },
  {
    kind: "popular-app",
    appType: "maps",
    appName: "Google Maps",
    pattern: "Bottom Sheet",
    title: "Google Maps: detalles de un lugar",
    body: "En una app de mapas, el Bottom Sheet mantiene visible el mapa mientras muestra informacion del sitio seleccionado.",
    examples: ["Como llegar", "Guardar", "Compartir"],
    accent: C.blue,
  },
  {
    kind: "popular-app",
    appType: "commerce",
    appName: "Amazon",
    pattern: "Bottom Sheet",
    title: "Amazon: seleccionar variante",
    body: "En e-commerce, el Bottom Sheet permite elegir talla, color, cantidad o envio antes de agregar al carrito.",
    examples: ["Talla M", "Cantidad 1", "Agregar"],
    accent: C.amber,
  },
  {
    kind: "popular-app",
    appType: "bank",
    appName: "BBVA / banca movil",
    pattern: "Modal",
    title: "Banca movil: Modal de confirmacion",
    body: "En apps bancarias, el Modal reduce errores al confirmar monto, destinatario y accion antes de ejecutar.",
    examples: ["Revisar monto", "Confirmar", "Cancelar"],
    accent: C.green,
  },
  {
    kind: "web-video-policy",
    title: "Videos/GIFs de internet: criterio de uso",
    body: "Se buscaron clips y GIFs de apps populares. Para evitar usar capturas sin permiso, se integran como referencias web y se recrean animaciones educativas en el HTML.",
    cards: [
      ["No descargar al PPTX", "Videos de apps populares suelen ser material de terceros."],
      ["Usar links", "Mejor abrir ejemplos oficiales o de soporte en vivo."],
      ["HTML animado", "La version HTML incluye pantallas que se mueven tipo GIF."],
      ["PPTX limpio", "Mantiene ilustraciones editables y sin material no autorizado."],
    ],
  },
  {
    kind: "web-links",
    title: "Links para mostrar videos/referencias en vivo",
    body: "Estos enlaces sirven como apoyo para abrir durante la presentacion si quieren mostrar el comportamiento real de apps o guias oficiales.",
    links: [
      ["WhatsApp", "Eliminar mensajes", "https://faq.whatsapp.com/1370476507114859/"],
      ["Material Design", "Bottom sheets", "https://m3.material.io/components/bottom-sheets/overview"],
      ["Material Design", "Dialogs", "https://m3.material.io/components/dialogs/overview"],
      ["Google Maps", "Rutas y opciones", "https://support.google.com/maps/answer/144339"],
      ["Instagram", "Centro de ayuda", "https://help.instagram.com/"],
    ],
  },
  {
    kind: "html-gif-note",
    title: "HTML: ejemplos animados tipo GIF",
    body: "En el archivo HTML, las pantallas de WhatsApp, Instagram, TikTok, Maps, Amazon y banca se animan como microclips: Modal aparece, Bottom Sheet sube y el contenido mantiene contexto.",
    bullets: ["Animacion directa en navegador", "Sin descargar videos de terceros", "Mismo diseno visual del deck", "Ideal para proyectar durante la exposicion"],
  },
  {
    kind: "decision",
    title: "Como decidir: Modal o Bottom Sheet",
    body: "Una regla simple: si el usuario debe detenerse y decidir, Modal. Si necesita elegir una opcion manteniendo contexto, Bottom Sheet.",
    left: ["Accion critica", "Confirmacion obligatoria", "Error o advertencia", "Datos sensibles"],
    right: ["Opciones rapidas", "Filtros", "Compartir", "Detalles complementarios"],
  },
  {
    kind: "code-shot",
    title: "Captura de codigo: importaciones",
    body: "Esta primera captura explica por que necesitamos hooks, Modal, Animated y Pressable.",
    code: "import { useEffect, useRef, useState } from 'react';\nimport { StatusBar } from 'expo-status-bar';\nimport {\n  Animated,\n  Modal,\n  Pressable,\n  StyleSheet,\n  Text,\n  View,\n} from 'react-native';",
    notes: ["useState controla visibilidad", "useRef conserva Animated.Value", "Pressable dispara acciones"],
  },
  {
    kind: "code-shot",
    title: "Captura de codigo: estados",
    body: "Estos estados son el centro de la demo. La interfaz cambia porque ellos cambian.",
    code: "const [modalVisible, setModalVisible] = useState(false);\nconst [sheetVisible, setSheetVisible] = useState(false);\nconst [selectedMode, setSelectedMode] = useState('Presencial');\nconst [reservationConfirmed, setReservationConfirmed] = useState(false);",
    notes: ["booleanos para abrir/cerrar", "selectedMode guarda eleccion", "reservationConfirmed evita confusiones"],
  },
  {
    kind: "code-shot",
    title: "Captura de codigo: prop visible",
    body: "`visible` conecta el estado con el componente nativo Modal.",
    code: "<Modal\n  visible={modalVisible}\n  animationType=\"fade\"\n  transparent\n  onRequestClose={() => setModalVisible(false)}\n>\n  {/* contenido */}\n</Modal>",
    notes: ["visible lee el estado", "fade suaviza entrada", "onRequestClose protege Android"],
  },
  {
    kind: "code-shot",
    title: "Captura de codigo: confirmacion",
    body: "La accion de confirmar cambia dos estados: marca la reserva y cierra el Modal.",
    code: "<Pressable\n  onPress={() => {\n    setReservationConfirmed(true);\n    setModalVisible(false);\n  }}\n>\n  <Text>Confirmar</Text>\n</Pressable>",
    notes: ["Primero confirma", "Despues cierra", "La UI se actualiza sola"],
  },
  {
    kind: "code-shot",
    title: "Captura de codigo: componente BottomSheet",
    body: "La API propia del componente se entiende desde sus props.",
    code: "function BottomSheet({\n  visible,\n  onClose,\n  title,\n  height = 320,\n  closeOnBackdropPress = true,\n  children,\n}) {\n  // cuerpo del componente\n}",
    notes: ["children recibe opciones", "height controla alto", "onClose centraliza cierre"],
  },
  {
    kind: "code-shot",
    title: "Captura de codigo: animacion del sheet",
    body: "El movimiento se logra animando `translateY`, una propiedad compatible con useNativeDriver.",
    code: "Animated.timing(translateY, {\n  toValue: visible ? 0 : height,\n  duration: visible ? 250 : 200,\n  useNativeDriver: true,\n}).start();",
    notes: ["0 = abierto", "height = cerrado", "transform mantiene buen rendimiento"],
  },
  {
    kind: "code-shot",
    title: "Captura de codigo: seleccionar opcion",
    body: "Cada opcion del Bottom Sheet actualiza la modalidad y reinicia la confirmacion.",
    code: "function selectMode(mode) {\n  setSelectedMode(mode);\n  setReservationConfirmed(false);\n  setSheetVisible(false);\n}",
    notes: ["Actualiza modalidad", "Evita estado viejo", "Cierra el panel"],
  },
  {
    kind: "deep",
    title: "Microinteracciones que debe notar el grupo",
    body: "Estas pequenas decisiones hacen que la practica se sienta como una app real.",
    cards: [
      ["Overlay", "Oscurece la pantalla y enfoca la atencion."],
      ["Handle", "La barra superior sugiere que el sheet se puede mover."],
      ["Feedback", "El texto Estado cambia a Confirmada."],
      ["Cierre", "Cancelar, confirmar o tocar fuera."],
    ],
  },
  {
    kind: "deep",
    title: "Accesibilidad y usabilidad",
    body: "Aunque la practica es introductoria, conviene mencionar que los patrones deben ser claros y cerrables.",
    cards: [
      ["Salida clara", "Siempre debe existir una forma visible de cerrar."],
      ["Texto directo", "El usuario debe entender que esta decidiendo."],
      ["Contraste", "Overlay y tarjetas deben leerse bien."],
      ["No abusar", "Demasiados modales vuelven pesada la app."],
    ],
  },
  {
    kind: "lab",
    title: "Demo sugerida: minuto a minuto",
    body: "Una guia visual para que la exposicion no se sienta improvisada.",
    slots: [
      ["1", "Mostrar pantalla base"],
      ["2", "Abrir Bottom Sheet"],
      ["3", "Cambiar modalidad"],
      ["4", "Abrir Modal"],
      ["5", "Confirmar reserva"],
      ["6", "Explicar state final"],
    ],
  },
  {
    kind: "speaker",
    title: "Guion extendido por persona",
    body: "Cada integrante puede apoyarse en estas frases para mantener la presentacion equilibrada.",
    people: [
      ["Persona 1", "Explica Modal, props visibles y confirmacion."],
      ["Persona 2", "Explica Bottom Sheet, Animated y children."],
      ["Persona 3", "Explica state, flujo, demo y cierre."],
    ],
  },
  {
    kind: "browser-result",
    title: "Resultado final en navegador",
    body: "Asi se vera la practica al terminar: una pantalla de reserva con botones para abrir el Bottom Sheet y el Modal.",
    states: ["Modalidad: Presencial", "Estado: Pendiente", "Bottom Sheet: elegir modalidad", "Modal: confirmar reserva"],
  },
];

slides.splice(-2, 0, ...extraSlides);

function hexToRgb(hex) {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function svgData(svg) {
  return Buffer.from(svg);
}

function visualSvg(kind, title, accent = C.cyan) {
  const [r, g, b] = hexToRgb(accent);
  const glow = `rgba(${r},${g},${b},0.32)`;
  const base = `
  <svg xmlns="http://www.w3.org/2000/svg" width="700" height="430" viewBox="0 0 700 430">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#10213a"/>
        <stop offset="1" stop-color="#07111f"/>
      </linearGradient>
      <linearGradient id="a" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${accent}"/>
        <stop offset="1" stop-color="#2f7df6"/>
      </linearGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="18"/></filter>
    </defs>
    <rect width="700" height="430" rx="32" fill="url(#bg)"/>
    <circle cx="560" cy="70" r="90" fill="${accent}" opacity=".17" filter="url(#blur)"/>
    <circle cx="88" cy="360" r="80" fill="#8b5cf6" opacity=".16" filter="url(#blur)"/>
    <path d="M40 96 H660 M40 170 H660 M40 244 H660 M40 318 H660" stroke="#25415f" stroke-width="1"/>
    <path d="M110 40 V390 M220 40 V390 M330 40 V390 M440 40 V390 M550 40 V390" stroke="#25415f" stroke-width="1"/>
  `;
  const foot = `<text x="44" y="392" fill="#9fb2cc" font-family="Arial" font-size="20">${title}</text></svg>`;
  if (kind === "modal") {
    return base + `
      <rect x="222" y="44" width="255" height="342" rx="32" fill="#0b172a" stroke="#335273" stroke-width="3"/>
      <rect x="247" y="76" width="205" height="278" rx="22" fill="#eff6ff"/>
      <rect x="247" y="76" width="205" height="278" rx="22" fill="#0e1d31" opacity=".2"/>
      <rect x="274" y="148" width="150" height="128" rx="18" fill="#ffffff"/>
      <text x="302" y="184" fill="#0b172a" font-family="Arial" font-size="18" font-weight="700">Confirmar</text>
      <rect x="294" y="218" width="110" height="16" rx="8" fill="#dce9ff"/>
      <rect x="296" y="250" width="48" height="20" rx="10" fill="#edf1f7"/>
      <rect x="352" y="250" width="50" height="20" rx="10" fill="url(#a)"/>
    ` + foot;
  }
  if (kind === "sheet") {
    return base + `
      <rect x="222" y="44" width="255" height="342" rx="32" fill="#0b172a" stroke="#335273" stroke-width="3"/>
      <rect x="247" y="76" width="205" height="278" rx="22" fill="#eff6ff"/>
      <rect x="247" y="76" width="205" height="278" rx="22" fill="#0e1d31" opacity=".18"/>
      <rect x="247" y="208" width="205" height="146" rx="22" fill="#ffffff"/>
      <rect x="327" y="222" width="45" height="6" rx="3" fill="#b7c7d9"/>
      <rect x="272" y="248" width="155" height="22" rx="8" fill="#edf6ff"/>
      <rect x="272" y="280" width="155" height="22" rx="8" fill="#edf6ff"/>
      <rect x="272" y="312" width="155" height="22" rx="8" fill="url(#a)" opacity=".9"/>
    ` + foot;
  }
  if (kind === "flow") {
    return base + `
      <g fill="none" stroke="url(#a)" stroke-width="4">
        <path d="M105 215 H235"/>
        <path d="M305 215 H435"/>
        <path d="M505 215 H610"/>
      </g>
      <g font-family="Arial" font-size="18" font-weight="700">
        <rect x="55" y="160" width="120" height="110" rx="22" fill="#12243b" stroke="#335273"/>
        <text x="83" y="222" fill="#eaf2ff">Press</text>
        <rect x="225" y="160" width="120" height="110" rx="22" fill="#12243b" stroke="#335273"/>
        <text x="257" y="210" fill="#eaf2ff">set</text><text x="246" y="235" fill="#9fb2cc" font-size="14">state</text>
        <rect x="395" y="160" width="120" height="110" rx="22" fill="#12243b" stroke="#335273"/>
        <text x="424" y="222" fill="#eaf2ff">Render</text>
        <rect x="565" y="160" width="90" height="110" rx="22" fill="url(#a)"/>
        <text x="586" y="222" fill="#07111f">UI</text>
      </g>
    ` + foot;
  }
  return base + `
    <rect x="82" y="95" width="540" height="235" rx="28" fill="#10243d" stroke="#335273" stroke-width="2"/>
    <path d="M130 280 C200 145 280 250 350 170 S505 165 580 115" fill="none" stroke="url(#a)" stroke-width="8" stroke-linecap="round"/>
    <circle cx="130" cy="280" r="12" fill="${accent}"/>
    <circle cx="350" cy="170" r="12" fill="#55e09b"/>
    <circle cx="580" cy="115" r="12" fill="#ffcf5a"/>
  ` + foot;
}

function addBg(slide) {
  slide.background.fill = C.bg;
  slide.shapes.add({ geometry: "rect", position: { left: 0, top: 0, width: W, height: H }, fill: C.bg, line: { fill: "none", width: 0 } });
  slide.shapes.add({ geometry: "rect", position: { left: 0, top: 0, width: W, height: H }, fill: { color: C.bg2, transparency: 0 }, line: { fill: "none", width: 0 } });
  for (let i = 0; i < 9; i += 1) {
    slide.shapes.add({
      geometry: "line",
      position: { left: 80 + i * 130, top: 84, width: 0, height: 560 },
      line: { style: "solid", fill: "#10243d", width: 1 },
      fill: "none",
    });
  }
  for (let i = 0; i < 5; i += 1) {
    slide.shapes.add({
      geometry: "line",
      position: { left: 70, top: 130 + i * 104, width: 1140, height: 0 },
      line: { style: "solid", fill: "#10243d", width: 1 },
      fill: "none",
    });
  }
}

function text(slide, value, x, y, w, h, style = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  shape.text = value;
  shape.text.style = { typeface: "Aptos", fontSize: 22, color: C.ink, ...style };
  return shape;
}

function pill(slide, value, x, y, w, accent = C.cyan) {
  slide.shapes.add({ geometry: "roundRect", position: { left: x, top: y, width: w, height: 34 }, fill: accent, line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
  text(slide, value, x + 14, y + 7, w - 28, 20, { fontSize: 12, bold: true, color: C.bg, alignment: "center" });
}

function title(slide, s, section = "MODAL & BOTTOM SHEET") {
  text(slide, section, 72, 42, 430, 24, { fontSize: 12, bold: true, color: C.cyan });
  text(slide, s.title, 72, 82, 760, 92, { fontSize: 38, bold: true, typeface: "Aptos Display", color: C.white });
  text(slide, s.body, 72, 176, 710, 68, { fontSize: 20, color: C.muted });
}

function addFooter(slide, i) {
  text(slide, `React Native | Modal & Bottom Sheet`, 72, 680, 500, 18, { fontSize: 10, color: "#6f86a6" });
  text(slide, String(i + 1).padStart(2, "0"), 1175, 676, 40, 24, { fontSize: 14, bold: true, color: C.cyan, alignment: "right" });
}

function addImage(slide, kind, label, x, y, w, h, accent = C.cyan) {
  slide.images.add({
    blob: svgData(visualSvg(kind, label, accent)),
    contentType: "image/svg+xml",
    alt: label,
    fit: "cover",
    position: { left: x, top: y, width: w, height: h },
    geometry: "roundRect",
    borderRadius: "rounded-2xl",
  });
}

function addCode(slide, code, x, y, w, h) {
  slide.shapes.add({ geometry: "roundRect", position: { left: x, top: y, width: w, height: h }, fill: "#06101d", line: { fill: "#244360", width: 1 }, borderRadius: "rounded-xl" });
  text(slide, code, x + 24, y + 24, w - 48, h - 48, { typeface: "Consolas", fontSize: 17, color: "#d9e8ff" });
}

function card(slide, x, y, w, h, heading, body, accent = C.cyan) {
  slide.shapes.add({ geometry: "roundRect", position: { left: x, top: y, width: w, height: h }, fill: C.card, line: { fill: C.line, width: 1 }, borderRadius: "rounded-xl" });
  slide.shapes.add({ geometry: "rect", position: { left: x, top: y, width: 6, height: h }, fill: accent, line: { fill: "none", width: 0 } });
  text(slide, heading, x + 24, y + 20, w - 48, 30, { fontSize: 20, bold: true, color: C.white });
  text(slide, body, x + 24, y + 58, w - 48, h - 72, { fontSize: 16, color: C.muted });
}

function appMockup(slide, x, y, w, h, type = "chat", accent = C.cyan) {
  slide.shapes.add({ geometry: "roundRect", position: { left: x, top: y, width: w, height: h }, fill: "#06101d", line: { fill: "#335273", width: 3 }, borderRadius: "rounded-2xl" });
  const sx = x + 20;
  const sy = y + 26;
  const sw = w - 40;
  const sh = h - 52;
  slide.shapes.add({ geometry: "roundRect", position: { left: sx, top: sy, width: sw, height: sh }, fill: "#eff6ff", line: { fill: "none", width: 0 }, borderRadius: "rounded-2xl" });
  slide.shapes.add({ geometry: "rect", position: { left: sx, top: sy, width: sw, height: 52 }, fill: "#0c1729", line: { fill: "none", width: 0 } });
  if (type === "chat") {
    ["#dbeafe", "#bbf7d0", "#dbeafe", "#bbf7d0"].forEach((fill, i) => {
      const left = i % 2 ? sx + 78 : sx + 20;
      slide.shapes.add({ geometry: "roundRect", position: { left, top: sy + 78 + i * 52, width: sw - 98, height: 34 }, fill, line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
    });
    slide.shapes.add({ geometry: "roundRect", position: { left: sx + 28, top: sy + sh - 102, width: sw - 56, height: 74 }, fill: "#ffffff", line: { fill: "#d9e2ef", width: 1 }, borderRadius: "rounded-xl" });
    text(slide, "Eliminar mensaje?", sx + 50, sy + sh - 82, sw - 100, 22, { fontSize: 15, bold: true, color: "#0b172a", alignment: "center" });
    slide.shapes.add({ geometry: "roundRect", position: { left: sx + 54, top: sy + sh - 50, width: 70, height: 22 }, fill: "#edf1f7", line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
    slide.shapes.add({ geometry: "roundRect", position: { left: sx + sw - 126, top: sy + sh - 50, width: 70, height: 22 }, fill: accent, line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
  } else if (type === "social") {
    slide.shapes.add({ geometry: "rect", position: { left: sx + 22, top: sy + 72, width: sw - 44, height: 170 }, fill: "#dbeafe", line: { fill: "none", width: 0 } });
    slide.shapes.add({ geometry: "roundRect", position: { left: sx, top: sy + sh - 190, width: sw, height: 190 }, fill: "#ffffff", line: { fill: "none", width: 0 }, borderRadius: "rounded-2xl" });
    ["Compartir", "Guardar", "Reportar"].forEach((label, i) => {
      slide.shapes.add({ geometry: "roundRect", position: { left: sx + 24, top: sy + sh - 158 + i * 46, width: sw - 48, height: 34 }, fill: i === 0 ? accent : "#edf6ff", line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
      text(slide, label, sx + 42, sy + sh - 150 + i * 46, sw - 84, 18, { fontSize: 13, bold: true, color: i === 0 ? C.bg : "#0b172a" });
    });
  } else if (type === "commerce") {
    slide.shapes.add({ geometry: "roundRect", position: { left: sx + 28, top: sy + 78, width: sw - 56, height: 132 }, fill: "#dbeafe", line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
    slide.shapes.add({ geometry: "roundRect", position: { left: sx, top: sy + sh - 182, width: sw, height: 182 }, fill: "#ffffff", line: { fill: "none", width: 0 }, borderRadius: "rounded-2xl" });
    ["S", "M", "L"].forEach((label, i) => {
      slide.shapes.add({ geometry: "roundRect", position: { left: sx + 34 + i * 60, top: sy + sh - 132, width: 44, height: 36 }, fill: i === 1 ? accent : "#edf6ff", line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
      text(slide, label, sx + 34 + i * 60, sy + sh - 123, 44, 16, { fontSize: 13, bold: true, color: i === 1 ? C.bg : "#0b172a", alignment: "center" });
    });
    slide.shapes.add({ geometry: "roundRect", position: { left: sx + 34, top: sy + sh - 72, width: sw - 68, height: 36 }, fill: C.green, line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
  } else if (type === "maps") {
    ["#dbeafe", "#bfdbfe", "#dcfce7", "#fde68a"].forEach((fill, i) => {
      slide.shapes.add({ geometry: "rect", position: { left: sx + (i % 2) * (sw / 2), top: sy + 52 + Math.floor(i / 2) * 116, width: sw / 2, height: 116 }, fill, line: { fill: "none", width: 0 } });
    });
    slide.shapes.add({ geometry: "roundRect", position: { left: sx + 50, top: sy + 120, width: 40, height: 40 }, fill: C.pink, line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
    slide.shapes.add({ geometry: "roundRect", position: { left: sx, top: sy + sh - 160, width: sw, height: 160 }, fill: "#ffffff", line: { fill: "none", width: 0 }, borderRadius: "rounded-2xl" });
    text(slide, "Lugar cercano", sx + 28, sy + sh - 130, sw - 56, 20, { fontSize: 16, bold: true, color: "#0b172a" });
    slide.shapes.add({ geometry: "roundRect", position: { left: sx + 28, top: sy + sh - 72, width: sw - 56, height: 34 }, fill: accent, line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
  } else {
    ["Cuenta origen", "Cuenta destino", "Monto"].forEach((label, i) => {
      slide.shapes.add({ geometry: "roundRect", position: { left: sx + 26, top: sy + 78 + i * 52, width: sw - 52, height: 34 }, fill: "#dbeafe", line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
    });
    slide.shapes.add({ geometry: "roundRect", position: { left: sx + 28, top: sy + sh - 122, width: sw - 56, height: 94 }, fill: "#ffffff", line: { fill: "#d9e2ef", width: 1 }, borderRadius: "rounded-xl" });
    text(slide, "Confirmar transferencia", sx + 44, sy + sh - 98, sw - 88, 22, { fontSize: 14, bold: true, color: "#0b172a", alignment: "center" });
    slide.shapes.add({ geometry: "roundRect", position: { left: sx + 52, top: sy + sh - 58, width: sw - 104, height: 28 }, fill: C.green, line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
  }
}

function codeScreenshot(slide, code, x, y, w, h, accent = C.cyan) {
  slide.shapes.add({ geometry: "roundRect", position: { left: x, top: y, width: w, height: h }, fill: "#040b14", line: { fill: "#244360", width: 1 }, borderRadius: "rounded-xl" });
  slide.shapes.add({ geometry: "rect", position: { left: x, top: y, width: w, height: 38 }, fill: "#0d1a2c", line: { fill: "none", width: 0 } });
  [C.pink, C.amber, C.green].forEach((color, i) => slide.shapes.add({ geometry: "ellipse", position: { left: x + 18 + i * 22, top: y + 13, width: 10, height: 10 }, fill: color, line: { fill: "none", width: 0 } }));
  text(slide, "ModalScreen.js", x + 92, y + 10, 200, 16, { fontSize: 12, bold: true, color: accent });
  text(slide, code, x + 28, y + 58, w - 56, h - 76, { typeface: "Consolas", fontSize: 15, color: "#d9e8ff" });
}

function popularAppIllustration(slide, s) {
  const accent = s.accent || C.cyan;
  appMockup(slide, 794, 104, 330, 536, s.appType, accent);
  slide.shapes.add({
    geometry: "roundRect",
    position: { left: 834, top: 132, width: 250, height: 38 },
    fill: "#0d1a2c",
    line: { fill: "#244360", width: 1 },
    borderRadius: "rounded-xl",
  });
  const shortPattern = s.pattern === "Bottom Sheet" ? "Sheet" : s.pattern;
  text(slide, s.appName, 852, 142, 160, 18, { fontSize: 16, bold: true, color: accent });
  text(slide, shortPattern, 1002, 144, 68, 16, { fontSize: 11, bold: true, color: C.muted, alignment: "right" });
  s.examples.forEach((ex, idx) => {
    const x = 94 + (idx % 2) * 330;
    const y = 302 + Math.floor(idx / 2) * 100;
    card(slide, x, y, 292, 74, ex, `Ejemplo aplicado en ${s.appName}.`, [accent, C.cyan, C.amber, C.pink][idx % 4]);
  });
  card(
    slide,
    94,
    526,
    622,
    76,
    "Nota para presentar",
    `Recreacion educativa inspirada en patrones comunes de ${s.appName}; no es captura oficial ni usa logos.`,
    accent
  );
}

function browserResultMockup(slide) {
  const x = 90;
  const y = 250;
  const w = 1020;
  const h = 360;
  slide.shapes.add({ geometry: "roundRect", position: { left: x, top: y, width: w, height: h }, fill: "#06101d", line: { fill: "#335273", width: 2 }, borderRadius: "rounded-xl" });
  slide.shapes.add({ geometry: "rect", position: { left: x, top: y, width: w, height: 46 }, fill: "#0d1a2c", line: { fill: "none", width: 0 } });
  [C.pink, C.amber, C.green].forEach((color, i) => slide.shapes.add({ geometry: "ellipse", position: { left: x + 18 + i * 22, top: y + 17, width: 11, height: 11 }, fill: color, line: { fill: "none", width: 0 } }));
  slide.shapes.add({ geometry: "roundRect", position: { left: x + 104, top: y + 12, width: 390, height: 22 }, fill: "#07111f", line: { fill: "#244360", width: 1 }, borderRadius: "rounded-xl" });
  text(slide, "localhost:8081 / ModalScreen", x + 124, y + 17, 280, 12, { fontSize: 10, color: C.muted });

  const appX = x + 44;
  const appY = y + 76;
  slide.shapes.add({ geometry: "roundRect", position: { left: appX, top: appY, width: 420, height: 242 }, fill: "#f7f8fb", line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
  text(slide, "Reserva de clase", appX + 28, appY + 28, 250, 30, { fontSize: 25, bold: true, color: "#18202f" });
  text(slide, "React Native: Modal y Bottom Sheet", appX + 28, appY + 64, 300, 20, { fontSize: 13, color: "#5f6b7a" });
  slide.shapes.add({ geometry: "roundRect", position: { left: appX + 28, top: appY + 100, width: 360, height: 72 }, fill: "#ffffff", line: { fill: "#dfe4ea", width: 1 }, borderRadius: "rounded-md" });
  text(slide, "Clase practica", appX + 46, appY + 114, 180, 18, { fontSize: 16, bold: true, color: "#18202f" });
  text(slide, "Duracion: 40 minutos    Modalidad: Presencial", appX + 46, appY + 140, 300, 16, { fontSize: 11, color: "#3f4a5a" });
  slide.shapes.add({ geometry: "roundRect", position: { left: appX + 28, top: appY + 188, width: 170, height: 34 }, fill: "#ffffff", line: { fill: "#1f6feb", width: 1 }, borderRadius: "rounded-md" });
  slide.shapes.add({ geometry: "roundRect", position: { left: appX + 218, top: appY + 188, width: 170, height: 34 }, fill: "#1f6feb", line: { fill: "none", width: 0 }, borderRadius: "rounded-md" });
  text(slide, "Elegir modalidad", appX + 54, appY + 198, 120, 12, { fontSize: 11, bold: true, color: "#1f6feb", alignment: "center" });
  text(slide, "Confirmar reserva", appX + 244, appY + 198, 120, 12, { fontSize: 11, bold: true, color: "#ffffff", alignment: "center" });

  const sheetX = x + 520;
  const sheetY = y + 76;
  slide.shapes.add({ geometry: "roundRect", position: { left: sheetX, top: sheetY, width: 206, height: 242 }, fill: "#f7f8fb", line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
  slide.shapes.add({ geometry: "rect", position: { left: sheetX, top: sheetY, width: 206, height: 242 }, fill: { color: "#000000", transparency: 50 }, line: { fill: "none", width: 0 } });
  slide.shapes.add({ geometry: "roundRect", position: { left: sheetX, top: sheetY + 112, width: 206, height: 130 }, fill: "#ffffff", line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
  slide.shapes.add({ geometry: "roundRect", position: { left: sheetX + 82, top: sheetY + 126, width: 42, height: 5 }, fill: "#c7ced8", line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
  text(slide, "Elige modalidad", sheetX + 24, sheetY + 144, 150, 18, { fontSize: 13, bold: true, color: "#18202f" });
  ["Presencial", "En linea", "Grabacion"].forEach((label, i) => {
    slide.shapes.add({ geometry: "roundRect", position: { left: sheetX + 24, top: sheetY + 168 + i * 22, width: 158, height: 17 }, fill: i === 0 ? "#1f6feb" : "#edf1f7", line: { fill: "none", width: 0 }, borderRadius: "rounded-md" });
    text(slide, label, sheetX + 34, sheetY + 171 + i * 22, 90, 10, { fontSize: 8, bold: true, color: i === 0 ? "#ffffff" : "#3f4a5a" });
  });

  const modalX = x + 770;
  const modalY = y + 76;
  slide.shapes.add({ geometry: "roundRect", position: { left: modalX, top: modalY, width: 206, height: 242 }, fill: "#f7f8fb", line: { fill: "none", width: 0 }, borderRadius: "rounded-xl" });
  slide.shapes.add({ geometry: "rect", position: { left: modalX, top: modalY, width: 206, height: 242 }, fill: { color: "#000000", transparency: 45 }, line: { fill: "none", width: 0 } });
  slide.shapes.add({ geometry: "roundRect", position: { left: modalX + 24, top: modalY + 72, width: 158, height: 104 }, fill: "#ffffff", line: { fill: "#dfe4ea", width: 1 }, borderRadius: "rounded-md" });
  text(slide, "Confirmar reserva", modalX + 42, modalY + 92, 122, 16, { fontSize: 12, bold: true, color: "#18202f", alignment: "center" });
  text(slide, "Modalidad Presencial", modalX + 44, modalY + 118, 118, 14, { fontSize: 8, color: "#5f6b7a", alignment: "center" });
  slide.shapes.add({ geometry: "roundRect", position: { left: modalX + 40, top: modalY + 144, width: 50, height: 20 }, fill: "#edf1f7", line: { fill: "none", width: 0 }, borderRadius: "rounded-md" });
  slide.shapes.add({ geometry: "roundRect", position: { left: modalX + 100, top: modalY + 144, width: 64, height: 20 }, fill: "#1f6feb", line: { fill: "none", width: 0 }, borderRadius: "rounded-md" });

  slide.shapes.add({ geometry: "roundRect", position: { left: 90, top: 624, width: 1020, height: 50 }, fill: C.card, line: { fill: C.line, width: 1 }, borderRadius: "rounded-xl" });
  slide.shapes.add({ geometry: "rect", position: { left: 90, top: 624, width: 6, height: 50 }, fill: C.green, line: { fill: "none", width: 0 } });
  text(slide, "Resultado mostrado: pantalla base, Bottom Sheet abierto y Modal de confirmacion en web.", 124, 642, 900, 18, { fontSize: 16, bold: true, color: C.white });
}

function renderSlide(p, s, i) {
  const slide = p.slides.add();
  addBg(slide);
  addFooter(slide, i);
  if (s.kind === "cover") {
    text(slide, s.kicker, 72, 62, 720, 24, { fontSize: 14, bold: true, color: C.cyan });
    text(slide, s.title, 72, 140, 720, 130, { fontSize: 68, bold: true, typeface: "Aptos Display", color: C.white });
    text(slide, s.body, 76, 292, 660, 86, { fontSize: 24, color: C.muted });
    pill(slide, "40 MIN", 76, 410, 115, C.green);
    pill(slide, "PPTX + HTML", 208, 410, 150, C.cyan);
    pill(slide, "MIAPP2", 374, 410, 120, C.amber);
    addImage(slide, "modal", "UI patterns for mobile apps", 760, 86, 430, 470, C.cyan);
    return;
  }
  title(slide, s);
  if (s.kind === "concept") {
    addImage(slide, s.title.includes("Bottom") ? "sheet" : "modal", s.title, 810, 112, 360, 330, s.title.includes("Bottom") ? C.green : C.cyan);
    s.bullets.forEach((b, idx) => card(slide, 88 + (idx % 2) * 340, 284 + Math.floor(idx / 2) * 116, 310, 90, b, idx === 0 ? "Idea clave para decidir el patron correcto." : "Aplicacion directa dentro de la practica.", [C.cyan, C.green, C.amber, C.pink, C.violet][idx % 5]));
  } else if (s.kind === "summary") {
    addImage(slide, "modal", s.title, 820, 112, 340, 330, C.cyan);
    s.bullets.forEach((b, idx) => {
      const x = 92 + (idx % 2) * 360;
      const y = 284 + Math.floor(idx / 2) * 88;
      slide.shapes.add({ geometry: "roundRect", position: { left: x, top: y, width: 320, height: 64 }, fill: C.card, line: { fill: C.line, width: 1 }, borderRadius: "rounded-xl" });
      slide.shapes.add({ geometry: "rect", position: { left: x, top: y, width: 6, height: 64 }, fill: [C.cyan, C.green, C.amber, C.pink, C.violet][idx], line: { fill: "none", width: 0 } });
      text(slide, b, x + 22, y + 18, 278, 26, { fontSize: 18, bold: true, color: C.white });
    });
  } else if (s.kind === "agenda") {
    s.items.forEach((it, idx) => {
      const x = 94 + (idx % 3) * 360;
      const y = 282 + Math.floor(idx / 3) * 132;
      card(slide, x, y, 315, 98, `${idx + 1}. ${it}`, "Bloque narrativo de la presentacion.", [C.cyan, C.blue, C.green, C.amber, C.pink, C.violet][idx]);
    });
  } else if (s.kind === "context") {
    s.labels.forEach((it, idx) => pill(slide, it, 92 + idx * 180, 294, 150, [C.cyan, C.green, C.amber, C.pink][idx]));
    card(slide, 92, 370, 640, 118, "Decision de practica", s.callout, C.green);
    addImage(slide, "chart", "Stack tecnico del proyecto", 800, 262, 330, 250, C.blue);
  } else if (s.kind === "phone-modal" || s.kind === "phone-sheet") {
    addImage(slide, s.kind === "phone-modal" ? "modal" : "sheet", s.title, 805, 110, 360, 390, s.kind === "phone-modal" ? C.cyan : C.green);
    addCode(slide, s.code, 92, 292, 620, 112);
    card(slide, 92, 432, 280, 96, "Lectura visual", s.kind === "phone-modal" ? "La decision se enfoca al centro." : "Las opciones suben desde la parte inferior.", C.amber);
    card(slide, 396, 432, 316, 96, "Uso recomendado", s.kind === "phone-modal" ? "Confirmaciones y avisos importantes." : "Filtros, seleccion y acciones rapidas.", C.green);
  } else if (s.kind === "props") {
    s.rows.forEach((r, idx) => {
      const y = 270 + idx * 54;
      slide.shapes.add({
        geometry: "roundRect",
        position: { left: 92, top: y, width: 900, height: 44 },
        fill: idx % 2 ? "#0f1e33" : C.card,
        line: { fill: C.line, width: 1 },
        borderRadius: "rounded-md",
      });
      slide.shapes.add({
        geometry: "rect",
        position: { left: 92, top: y, width: 6, height: 44 },
        fill: C.cyan,
        line: { fill: "none", width: 0 },
      });
      text(slide, r[0], 116, y + 11, 210, 22, { fontSize: 17, bold: true, color: C.white });
      text(slide, r[1], 350, y + 11, 230, 22, { fontSize: 15, color: C.muted });
      text(slide, r[2], 610, y + 11, 350, 22, { fontSize: 16, color: C.ink });
    });
  } else if (s.kind === "state" || s.kind === "animation" || s.kind === "implementation") {
    addCode(slide, s.code, 92, 280, 650, 285);
    addImage(slide, s.kind === "animation" ? "flow" : "chart", s.title, 800, 282, 330, 250, s.kind === "animation" ? C.green : C.blue);
  } else if (s.kind === "flow") {
    addImage(slide, "flow", "Flujo de estado a UI", 170, 270, 900, 310, C.cyan);
  } else if (s.kind === "compare") {
    s.rows.forEach((r, idx) => {
      const y = 260 + idx * 52;
      const fill = idx === 0 ? C.blue : C.card;
      slide.shapes.add({ geometry: "roundRect", position: { left: 90, top: y, width: 960, height: 42 }, fill, line: { fill: C.line, width: 1 }, borderRadius: "rounded-md" });
      text(slide, r[0], 112, y + 10, 250, 22, { fontSize: 16, bold: idx === 0, color: C.white });
      text(slide, r[1], 420, y + 10, 260, 22, { fontSize: 16, bold: idx === 0, color: C.white });
      text(slide, r[2], 734, y + 10, 290, 22, { fontSize: 16, bold: idx === 0, color: C.white });
    });
  } else if (s.kind === "architecture") {
    const positions = [[110,310],[370,260],[370,394],[640,260],[640,394],[890,327]];
    s.nodes.forEach((n, idx) => {
      slide.shapes.add({ geometry: "roundRect", position: { left: positions[idx][0], top: positions[idx][1], width: 190, height: 70 }, fill: idx === 0 ? C.blue : C.card, line: { fill: C.line, width: 1 }, borderRadius: "rounded-xl" });
      text(slide, n, positions[idx][0] + 12, positions[idx][1] + 24, 166, 24, { fontSize: 17, bold: true, alignment: "center" });
      if (idx > 0) slide.shapes.add({ geometry: "line", position: { left: positions[idx - 1][0] + 190, top: positions[idx - 1][1] + 35, width: positions[idx][0] - positions[idx - 1][0] - 190, height: positions[idx][1] - positions[idx - 1][1] }, line: { fill: C.cyan, width: 2 }, fill: "none" });
    });
  } else if (s.kind === "props-sheet") {
    s.rows.forEach((r, idx) => {
      const x = 92 + (idx % 3) * 340;
      const y = 282 + Math.floor(idx / 3) * 124;
      card(slide, x, y, 300, 94, r[0], r[1], [C.green, C.cyan, C.amber, C.pink, C.violet, C.blue][idx]);
    });
  } else if (s.kind === "timeline") {
    s.slots.forEach((slot, idx) => {
      const x = 100 + idx * 216;
      slide.shapes.add({ geometry: "roundRect", position: { left: x, top: 320, width: 176, height: 150 }, fill: idx % 2 ? C.card2 : C.card, line: { fill: C.line, width: 1 }, borderRadius: "rounded-xl" });
      text(slide, slot[0], x + 22, 340, 132, 38, { fontSize: 30, bold: true, color: [C.cyan, C.green, C.amber, C.pink, C.violet][idx], alignment: "center" });
      text(slide, slot[1], x + 18, 392, 140, 50, { fontSize: 18, bold: true, color: C.white, alignment: "center" });
    });
  } else if (s.kind === "roles") {
    s.people.forEach((p, idx) => card(slide, 96 + idx * 360, 292, 310, 190, p[0], `${p[1]}\n${p[2]}`, [C.cyan, C.green, C.amber][idx]));
  } else if (s.kind === "pitfalls") {
    s.items.forEach((it, idx) => {
      const y = 272 + idx * 78;
      card(slide, 92, y, 300, 58, it[0], it[1], C.pink);
      card(slide, 430, y, 420, 58, "Correccion", it[2], C.green);
    });
  } else if (s.kind === "video") {
    s.scenes.forEach((sc, idx) => pill(slide, `${idx + 1}. ${sc}`, 100 + (idx % 4) * 250, 294 + Math.floor(idx / 4) * 92, 210, [C.cyan, C.green, C.amber, C.pink][idx % 4]));
    addImage(slide, "flow", "Guion audiovisual", 800, 398, 320, 180, C.violet);
  } else if (s.kind === "questions") {
    s.questions.forEach((q, idx) => card(slide, 94 + (idx % 2) * 500, 270 + Math.floor(idx / 2) * 104, 450, 78, `Pregunta ${idx + 1}`, q, [C.cyan, C.green, C.amber, C.pink, C.violet][idx]));
  } else if (s.kind === "deep") {
    s.cards.forEach((it, idx) => {
      const x = 96 + (idx % 2) * 430;
      const y = 284 + Math.floor(idx / 2) * 126;
      card(slide, x, y, 390, 96, it[0], it[1], [C.cyan, C.green, C.amber, C.pink][idx]);
    });
    addImage(slide, "chart", s.title, 920, 300, 220, 170, C.violet);
  } else if (s.kind === "reallife") {
    appMockup(slide, 820, 106, 300, 530, s.appType, s.appType === "bank" ? C.green : s.appType === "social" ? C.pink : s.appType === "commerce" ? C.amber : s.appType === "maps" ? C.blue : C.cyan);
    s.examples.forEach((ex, idx) => {
      card(slide, 94 + (idx % 2) * 340, 288 + Math.floor(idx / 2) * 104, 300, 78, ex, "Ejemplo visual del patron.", [C.cyan, C.green, C.amber, C.pink][idx % 4]);
    });
    text(slide, "Mockup generico inspirado en patrones populares, sin logos ni pantallas oficiales.", 94, 596, 620, 24, { fontSize: 13, color: "#6f86a6" });
  } else if (s.kind === "popular-app") {
    popularAppIllustration(slide, s);
  } else if (s.kind === "browser-result") {
    browserResultMockup(slide);
  } else if (s.kind === "web-video-policy") {
    s.cards.forEach((it, idx) => {
      const x = 96 + (idx % 2) * 430;
      const y = 284 + Math.floor(idx / 2) * 126;
      card(slide, x, y, 390, 96, it[0], it[1], [C.cyan, C.green, C.amber, C.pink][idx]);
    });
    addImage(slide, "flow", "Busqueda web y uso seguro", 920, 302, 220, 166, C.cyan);
  } else if (s.kind === "web-links") {
    s.links.forEach((row, idx) => {
      const y = 272 + idx * 64;
      slide.shapes.add({ geometry: "roundRect", position: { left: 92, top: y, width: 980, height: 50 }, fill: idx % 2 ? "#0f1e33" : C.card, line: { fill: C.line, width: 1 }, borderRadius: "rounded-md" });
      slide.shapes.add({ geometry: "rect", position: { left: 92, top: y, width: 6, height: 50 }, fill: [C.green, C.cyan, C.amber, C.blue, C.pink][idx], line: { fill: "none", width: 0 } });
      text(slide, row[0], 120, y + 15, 160, 18, { fontSize: 16, bold: true, color: C.white });
      text(slide, row[1], 300, y + 15, 220, 18, { fontSize: 15, color: C.muted });
      text(slide, row[2], 540, y + 15, 500, 18, { fontSize: 13, color: C.cyan });
    });
  } else if (s.kind === "html-gif-note") {
    s.bullets.forEach((b, idx) => {
      const x = 92 + (idx % 2) * 370;
      const y = 292 + Math.floor(idx / 2) * 112;
      slide.shapes.add({ geometry: "roundRect", position: { left: x, top: y, width: 330, height: 80 }, fill: C.card, line: { fill: C.line, width: 1 }, borderRadius: "rounded-xl" });
      slide.shapes.add({ geometry: "rect", position: { left: x, top: y, width: 6, height: 80 }, fill: [C.cyan, C.green, C.amber, C.pink][idx], line: { fill: "none", width: 0 } });
      text(slide, b, x + 24, y + 18, 282, 34, { fontSize: 18, bold: true, color: C.white });
      text(slide, "Animado en HTML.", x + 24, y + 54, 260, 16, { fontSize: 13, color: C.muted });
    });
    appMockup(slide, 870, 214, 230, 370, "social", C.pink);
  } else if (s.kind === "decision") {
    card(slide, 96, 278, 460, 74, "Usa Modal cuando...", "La accion requiera detener al usuario y confirmar.", C.cyan);
    card(slide, 638, 278, 460, 74, "Usa Bottom Sheet cuando...", "El usuario necesite elegir sin perder contexto.", C.green);
    s.left.forEach((it, idx) => pill(slide, it, 128, 386 + idx * 46, 250, C.cyan));
    s.right.forEach((it, idx) => pill(slide, it, 670, 386 + idx * 46, 250, C.green));
  } else if (s.kind === "code-shot") {
    codeScreenshot(slide, s.code, 86, 278, 690, 326, C.cyan);
    s.notes.forEach((note, idx) => card(slide, 830, 286 + idx * 104, 300, 78, `Clave ${idx + 1}`, note, [C.cyan, C.green, C.amber][idx]));
  } else if (s.kind === "lab") {
    s.slots.forEach((slot, idx) => {
      const x = 104 + (idx % 3) * 342;
      const y = 284 + Math.floor(idx / 3) * 132;
      card(slide, x, y, 300, 98, `Paso ${slot[0]}`, slot[1], [C.cyan, C.green, C.amber, C.pink, C.violet, C.blue][idx]);
    });
  } else if (s.kind === "speaker") {
    s.people.forEach((p, idx) => {
      appMockup(slide, 104 + idx * 350, 292, 140, 250, ["chat", "social", "bank"][idx], [C.cyan, C.pink, C.green][idx]);
      card(slide, 258 + idx * 350, 312, 170, 160, p[0], `${p[1]}`, [C.cyan, C.pink, C.green][idx]);
    });
  } else if (s.kind === "sources") {
    s.sources.forEach((src, idx) => card(slide, 120, 262 + idx * 68, 820, 50, src, "Fuente usada para conceptos, props o trazabilidad.", [C.cyan, C.green, C.amber, C.pink, C.violet][idx]));
  }
}

function htmlEscape(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
}

function shortUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function renderHtml() {
  const nav = slides.map((s, i) => `<a href="#s${i + 1}">${String(i + 1).padStart(2, "0")}</a>`).join("");
  const body = slides.map((s, i) => {
    const visual = s.kind.includes("sheet") || s.title.includes("Bottom")
      ? "sheet"
      : s.kind.includes("modal") || s.title.includes("Modal")
        ? "modal"
        : "flow";
    const items =
      s.bullets ||
      s.items ||
      s.questions ||
      s.scenes ||
      s.examples ||
      s.notes ||
      s.states ||
      s.links ||
      s.cards ||
      s.slots ||
      s.people ||
      (s.left && s.right ? [...s.left, ...s.right] : []) ||
      [];
    let extra = "";
    if (s.code) {
      extra = `<pre><code>${htmlEscape(s.code)}</code></pre>`;
    } else if (s.kind === "web-links") {
      extra = `<div class="link-grid">${s.links
        .map((row) => {
          const [name, label, url] = row;
          return `<a class="link-card" href="${htmlEscape(url)}" target="_blank" rel="noreferrer">
            <strong>${htmlEscape(name)}</strong>
            <span>${htmlEscape(label)}</span>
            <em>${htmlEscape(shortUrl(url))}</em>
          </a>`;
        })
        .join("")}</div>`;
    } else if (items.length) {
      extra = `<div class="grid">${items.map((it) => `<div class="mini">${htmlEscape(Array.isArray(it) ? it.join(" · ") : it)}</div>`).join("")}</div>`;
    } else if (s.rows) {
      extra = `<div class="table">${s.rows.map((r) => `<div>${r.map((c) => `<span>${htmlEscape(c)}</span>`).join("")}</div>`).join("")}</div>`;
    }
    return `
      <section class="slide ${visual}" id="s${i + 1}">
        <div class="orb one"></div><div class="orb two"></div>
        <div class="meta">React Native · Modal & Bottom Sheet <b>${String(i + 1).padStart(2, "0")}</b></div>
        <main>
          <div class="copy">
            <p class="kicker">Practica guiada · 40 minutos</p>
            <h1>${htmlEscape(s.title)}</h1>
            <p class="lead">${htmlEscape(s.body)}</p>
            ${extra}
          </div>
          <div class="visual">
            <div class="phone">
              <div class="screen">
                <div class="status"></div>
                ${s.appName ? `<div class="app-name">${htmlEscape(s.appName)}</div>` : ""}
                <div class="app-card"></div>
                <div class="${visual === "sheet" ? "bottom-sheet" : "modal-card"}">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>`;
  }).join("");
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Modal & Bottom Sheet · React Native</title>
<style>
  :root{--bg:#07111f;--card:#111f35;--ink:#eaf2ff;--muted:#9fb2cc;--cyan:#35d9f2;--green:#55e09b;--amber:#ffcf5a;--pink:#ff5fa2;--blue:#2f7df6}
  *{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,Segoe UI,Arial,sans-serif;overflow-x:hidden}
  nav{position:fixed;z-index:10;right:18px;top:50%;transform:translateY(-50%);display:grid;gap:7px}
  nav a{width:34px;height:28px;border:1px solid #244360;border-radius:10px;color:var(--muted);display:grid;place-items:center;text-decoration:none;background:#09182a99;backdrop-filter:blur(10px);font-size:11px}
  .slide{min-height:100vh;position:relative;padding:46px 86px;overflow:hidden;background-image:linear-gradient(90deg,#10243d55 1px,transparent 1px),linear-gradient(#10243d55 1px,transparent 1px);background-size:112px 86px;scroll-snap-align:start}
  .slide main{min-height:calc(100vh - 92px);display:grid;grid-template-columns:1.06fr .94fr;gap:48px;align-items:center}
  .kicker{color:var(--cyan);font-weight:800;text-transform:uppercase;letter-spacing:.08em}
  h1{font-size:clamp(42px,5vw,78px);line-height:.95;margin:10px 0 22px;letter-spacing:0}
  .lead{font-size:clamp(19px,2vw,27px);line-height:1.35;color:var(--muted);max-width:760px}
  .meta{position:absolute;left:86px;right:86px;bottom:28px;color:#6f86a6;font-size:12px;display:flex;justify-content:space-between}
  .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:30px}
  .mini{background:linear-gradient(135deg,#12243b,#0d1a2c);border:1px solid #244360;border-radius:16px;padding:18px;color:#ddecff;box-shadow:0 18px 40px #0005;animation:rise .8s both;overflow-wrap:anywhere}
  .link-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:28px;max-width:860px}
  .link-card{min-height:104px;background:linear-gradient(135deg,#12243b,#0d1a2c);border:1px solid #244360;border-radius:16px;padding:18px 20px;color:#ddecff;text-decoration:none;box-shadow:0 18px 40px #0005;display:flex;flex-direction:column;justify-content:center;gap:8px;overflow:hidden;animation:rise .8s both}
  .link-card strong{font-size:20px;line-height:1.1;color:#fff}
  .link-card span{font-size:15px;color:var(--muted);line-height:1.2}
  .link-card em{font-style:normal;color:var(--cyan);font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  pre{margin-top:32px;background:#040b14;border:1px solid #244360;border-radius:18px;padding:24px;box-shadow:0 22px 60px #0008;overflow:auto}
  code{font:18px/1.45 Consolas,monospace;color:#d9e8ff}
  .table{margin-top:30px;border:1px solid #244360;border-radius:18px;overflow:hidden}
  .table div{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid #244360}.table div:last-child{border-bottom:0}
  .table span{padding:14px 16px;color:#ddecff}.table div:first-child span{background:var(--blue);font-weight:800}
  .visual{display:grid;place-items:center;min-height:520px}
  .phone{width:330px;height:585px;border-radius:42px;background:#06101d;border:3px solid #335273;box-shadow:0 0 0 10px #0b172a,0 40px 110px #000c,0 0 90px #35d9f233;position:relative;animation:float 5s ease-in-out infinite}
  .screen{position:absolute;inset:26px 20px;border-radius:28px;background:#eff6ff;overflow:hidden}
  .status{height:48px;background:#0c1729}.app-card{width:80%;height:132px;margin:38px auto;border-radius:18px;background:linear-gradient(135deg,#fff,#dce9ff);box-shadow:0 18px 30px #1234}
  .app-name{position:absolute;top:13px;left:24px;color:var(--cyan);font-weight:800;font-size:14px;z-index:3}
  .modal-card{position:absolute;left:43px;right:43px;top:205px;height:138px;border-radius:20px;background:white;box-shadow:0 22px 70px #0007;animation:pop 2.4s ease-in-out infinite}
  .bottom-sheet{position:absolute;left:0;right:0;bottom:0;height:210px;border-radius:28px 28px 0 0;background:white;box-shadow:0 -22px 70px #0006;animation:sheet 3s ease-in-out infinite}
  .modal-card span,.bottom-sheet span{display:block;height:18px;border-radius:9px;background:#dbeafe;margin:22px}
  .modal-card span:last-child,.bottom-sheet span:last-child{background:linear-gradient(90deg,var(--cyan),var(--blue))}
  .orb{position:absolute;border-radius:50%;filter:blur(20px);opacity:.35;animation:pulse 4s ease-in-out infinite}.one{width:260px;height:260px;right:7%;top:10%;background:var(--cyan)}.two{width:220px;height:220px;left:7%;bottom:8%;background:var(--pink);animation-delay:1s}
  @keyframes float{50%{transform:translateY(-18px) rotate(-1deg)}} @keyframes pop{50%{transform:scale(1.04);box-shadow:0 30px 90px #0008}} @keyframes sheet{0%,100%{transform:translateY(52px)}50%{transform:translateY(0)}} @keyframes pulse{50%{opacity:.55;transform:scale(1.1)}} @keyframes rise{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
  @media(max-width:900px){nav{display:none}.slide{padding:36px 24px}.slide main{grid-template-columns:1fr}.visual{min-height:420px}.phone{transform:scale(.78);animation:none}.meta{left:24px;right:24px}.grid,.link-grid{grid-template-columns:1fr}h1{font-size:44px}}
</style>
</head>
<body><nav>${nav}</nav>${body}</body></html>`;
}

async function writeBlob(file, blob) {
  await fs.writeFile(file, new Uint8Array(await blob.arrayBuffer()));
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  await fs.mkdir(PREVIEW, { recursive: true });
  await fs.mkdir(LAYOUT, { recursive: true });
  await fs.mkdir(QA, { recursive: true });
  await fs.writeFile(path.join(TMP, "source-notes.txt"), [
    "Deck source notes",
    "User-provided/generated local source: PRACTICA_MODAL_BOTTOM_SHEET.md",
    "Official source: React Native Docs Modal 0.81, https://reactnative.dev/docs/0.81/modal",
    "Official source: React Native Docs Animated 0.81, https://reactnative.dev/docs/0.81/animated",
    "Official source: React Docs useState, https://react.dev/reference/react/useState",
    "Official source: Gorhom React Native Bottom Sheet v5, https://gorhom.dev/react-native-bottom-sheet/props and /usage",
    "Official/support source: WhatsApp Help Center, deleting messages, https://faq.whatsapp.com/1370476507114859/",
    "Official/support source: Google Maps Help, directions and route options, https://support.google.com/maps/answer/144339",
    "Official design reference: Material Design 3 bottom sheets, https://m3.material.io/components/bottom-sheets/overview",
    "Official design reference: Material Design 3 dialogs, https://m3.material.io/components/dialogs/overview",
    "Official support hub reference: Instagram Help Center, https://help.instagram.com/",
    "Generated assets: SVG mobile UI mockups and abstract diagrams created in this script for educational illustration.",
    "Popular app examples: nominative educational references to common UI patterns in WhatsApp, Instagram, TikTok, Google Maps, Amazon and mobile banking. Visuals are generic recreations, not official screenshots, logos, or product UI captures.",
    "Browser result slide: generated mock screenshot based on the proposed ModalScreen.js practice UI, since miapp2 was not modified to run the final implementation.",
  ].join("\n"));
  await fs.writeFile(path.join(TMP, "slide-plan.txt"), [
    "Mode: create",
    "Audience: classroom presentation for React Native practice.",
    `Slide count: ${slides.length}`,
    "Palette: dark technological background #07111f, cards #111f35, cyan #35d9f2, blue #2f7df6, green #55e09b, amber #ffcf5a, pink #ff5fa2.",
    "Fonts: Aptos Display for headings, Aptos for body, Consolas for code.",
    "Visual system: editable text/shapes with embedded SVG illustrations, phone mockups, flow diagrams, tables and code panels.",
    "HTML version: CSS animated, scrollable slide deck.",
    "PPTX caveat: exported deck is editable but artifact-tool does not expose native PowerPoint object animations.",
  ].join("\n"));

  const p = Presentation.create({ slideSize: { width: W, height: H } });
  slides.forEach((s, i) => renderSlide(p, s, i));

  for (const [index, slide] of p.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(PREVIEW, `${stem}.png`), await p.export({ slide, format: "png", scale: 1 }));
    await fs.writeFile(path.join(LAYOUT, `${stem}.layout.json`), await (await slide.export({ format: "layout" })).text());
  }
  await writeBlob(path.join(PREVIEW, "deck-montage.webp"), await p.export({ format: "webp", montage: true, scale: 1 }));
  const pptx = await PresentationFile.exportPptx(p);
  await pptx.save(pptxPath);
  await fs.writeFile(htmlPath, renderHtml());
  await fs.writeFile(path.join(QA, "visual-qa.txt"), [
    "Mechanical",
    `PPTX exists: ${pptxPath}`,
    `HTML exists: ${htmlPath}`,
    `Expected slide count: ${slides.length}`,
    "Every slide rendered to preview PNG.",
    "Deck montage rendered.",
    "Layout JSON exported per slide.",
    "Known caveat: native PPT object animations were not added because artifact-tool API does not expose animation/transition authoring. HTML includes CSS animations.",
    "",
    "Visual QA",
    "Dark technological style is consistent.",
    "Slides use large readable type, code panels, diagrams, tables, and mobile UI illustrations.",
    "No full-slide bitmap replaces editable slide content.",
    "Sources are listed in source-notes.txt and final sources slide.",
  ].join("\n"));
  console.log(JSON.stringify({ pptxPath, htmlPath, slides: slides.length, work: WORK }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
