/**
 * Archivo editorial: paquetes individuales verificados en capcut pro, iconos y photoshop dentro de Diseño Grafico.
 */
import type { CatalogItem, ResourceCategory } from "@/data/catalog";

type Profile = Pick<CatalogItem, "category" | "resourceType" | "tags" | "purpose" | "projects" | "color">;
type Source = "capcut pro" | "iconos" | "photoshop";

const capcut = `
10IqTiuP7t4DUApg4aQXRnkmwgb_Wosf3|action-elements-pack-fcpx
1Ts897gNJpvg8p4wAjKpr0gqDRiNFFh8c|advanced-explosions-pack-for-fcpx
1MJooc5eYMvjSQSSVdoL1sdslaDZnU-xA|ai-stories-and-posts-pack
1_oNACagHUfO9B6ctw3qJ22UQznhBlLz5|audio-visualizers-pack
1mIbodIU5zPE3gOi3ugrtAXHnVNV3tKmh|auto-resizing-titles-pack
16OrQxgRQctB-kasb_qggu2WP34tbfiSV|brightly-v2-animations-explainer-toolkit-final
1baw20_mYPMJkERo8MoXRRTZswdOHN1e9|brightly-v3-5-animations-explainer-toolkit-fin
1CCtLlCElZELMjQQx6zG21thMg91OO_IR|business-icons-pack-for-fcpx
1xAG6kK93dbtZTB_5KhuAlNKS4T2aPtTm|cartoon-energy-elements-pack-fcpx
1nisckZAPyV3EwVqZYSDjvAKrNZ6I3VKF|cartoon-transitions-pack
1nznuPF4Wg_CuXnDoFgVFOR0TE1JpK95X|characters-pack-for-explainers-for-fcpx
1RboQXXKciSkjLVJ7Q0a0WaoWGq0HGebl|cinematic-titles-pack
1Nt2AJpuqcB5hSQ7lfRP_BfHWz5G-sxbd|clean-broadcast-pack
1EaV64nKs2TvLQrU49Yo8_3bFz9G8xBAi|digital-earth-pack-for-fcpx
1ePOp9-8SI-symBius3kBB8hxmnq6jVgh|digital-futuristic-interface-pack-for-fcpx
1zsLdjvZxS6sIbGntcDOk4ZpCdaX4b47r|emojis-animated-pack
1dsRNSiBm7yCsK_9NWmOGKWbi48AByrow|explosions-pack-fcpx
14PaCwCjXGQ4BDFT5J1TnERlhRgUHfTxD|fcpx-minimal-lower-thirds-pack
1aWkLH-GnM-riaeu3v1PS9Da3_mTA2cnl|fire-elements-pack-fcpx
1GPicul2KlT4jRkfsCFz79jMniEOUtSRW|fire-pack-fcpx
12ZmrDmbbMndKalxgr84Mf18e7NXP1Mc8|flash-fx-elements-pack-fcpx
1med5kbO4LFnd87Fvn3Y7uwGDHvQkgYiA|flash-fx-logo-pack-fcpx
1rFHIf0rcm0q9bk9-QyzmasbiJC8RyibN|flash-fx-pack-08-fcpx
1j3uQgyL6Mbw_VHTY7sXTJp27aV0XzJ6Y|icons-pack-for-fcpx
1ScKVi1kQHhvusDm47t2TvyKqFweMnHbI|industrial-icons-pack-for-fcpx
1JUzfBsoWVKz5yUyycL07LG7vBlYYHvGx|instagram-pack-fcpx
1iZCBEpJ-kkoI75le50LFIWZJ92O5mvHo|lightning-pack-fcpx
1vNkuzusoQDDA2SyhQuKPuBU1v5IKNfJp|liquid-transitions-big-pack-fcpx
1bqI5P_Tfbs970DRVJD41xLQ57omOj5cE|liquid-transitions-pack-06-fcpx
1rRjdluzy25H1Xtn4kKU8mM0moPEL9EL7|liquid-transitions-pack-08-fcpx
1GkuMZma7oBHiKCv61v2lbj_DnD_eawPr|logo-reveal-pack
1AWVWe6_j2aK6DAO46p0yP3kMPVXOUtSl|lower-thirds-pack-fcpx
1G7TWod0Q7-PKkTaXKiT92cCUD5hMIiTe|magic-fx-pack-fcpx
1ijQS1cuqvYtP_aJSfM1KWRYxte8MJLci|modern-broadcast-pack
1Oh6PoGmXu_j9dgqU420Rph_x2t4ScEds|multiscreen-pack
1bivKEAAFkmvbNS9htsaf8rTb0vnADHyw|multiscreen-transitions-multiscreen-pack
1TcgPM-Yfhc-a_Km9ITb1PTZRu1weCexp|scribble-pack
12iQR1G7xXyrKzblvlECmfTknZ3YiTve8|simple-liquid-logo-pack-fcpx
1tTOXLbd3BB1rv1kkYDa4V7iOqfjWZLqJ|smoke-and-fire-elements-pack-fcpx
1rhOGZwmE0OLqwizMhpnEvLw7eM8MrI8a|social-media-icons-pack-fcpx
1ubNjVdOCcz67i3Ch5arQwV2H951WXZVp|social-media-lower-third-big-pack-fcpx-duplicate
121KThGcMsbcec-AK2t4G7PcuwfoclT_x|social-media-lower-third-big-pack-fcpx
19zGMJerSDY2gy36iQdbn-O_PlZTzRQxo|social-media-pack-3d
1EbNntvYHR8WCgLq8N0lMbD8aI6jVGRBp|stories-pack
1963zx1kgFkbUToXTKvrTtA0Fji_ZdeNq|super-creators-pack
1eT0EYoK6e6e6aJ3o0eXFGjc-Y-SBchta|the-ultimate-youtuber-pack-final-cut-pro-x
10Wb5LAVo39STrp3WiDBvRObEPaqw9i8j|titles-pack
1tAm-QxkN-EpQHPxZXcB3O8bDVK2vorbL|titles-pack-fcpx
1qE8VdIfw_YxPVfUYh5ux8eeHqKsCUeLp|titles-pack-fcpx-or-apple-motion
1tXMQ7aFcPLhg7yyMa852AM12YfbYuN4-|transitions-pack
`;

const icons = `
1RBvHwgQQAjQm71jIOVgIeC9glxwkfA-N|3d-abstract-shapes-glass-dispersion
1_43GDR8FZ563Wcgbo5UCecOfm2YaZZFW|3d-crypto-icon
1AMjs0V73ARX7P-sHSsK2ZNALB1BLa-u6|3d-cyberpunk-grid-y2k-wireframe
1owcdlO8vx4KWYgx9yApCII6FNsi7cPek|3d-detective-icon
1TXDKPYgPoR6FE9QOVY35BnCQMyKnzEV8|3d-geometrical-shape
1Lf0oCjUA54AIAKCU5F6eqb7Tv1qJWbcJ|3d-geometry-abstract-shape
1jE9CdMobUl58JTeaxC_ipO1No2t_RiUa|3d-halloween-icon
1zedTNkBYU8OgAmVntsMNwN428Nb2n8Rl|3d-objects-and-editing
1J-W5hFBOzZwIdfbW6RgX0MhBWaShmd2k|3d-positive-habits-icon
1Ch_jMXdPJCAO4EknsZJKXqLpQVG2Ng3j|3d-shapes-icons
14KuNiHceAN9GqhKy1FsxWW0JqzMu7U1R|3d-silver-y2k-abstract-shapes
1dY0OGJTHU9caQkmitKrmZp5M60izJHSw|3d-toy-icon
14Fej43fDH8HZNnxCdWKtpEQLv7Bjbhpz|3d-wizard-icon
1y8n5WvI72evTgAYr33UM6-EGQ6drPPEc|15-coffee-icon-set
1gjoJHgPd3_xVXSHaX6GNGQH55UujsHDg|20-geometric-icons
1HJ85NU1I1x6F6c3IQFntuzLmC_FoVfOE|20-law-firm-icon-pack
1g7MTDkk_9v6RSCdvZTqPZA76iz9r_SN7|24-zodiac-filled-green-black-icons
1XRYh44cpQ3_gw8O4VszhmcYrJPI7sy63|24-zodiac-filled-line-icons
1yNCw2I_zuGVyQwWX6nTP3n6hqQ4O4uHq|24-zodiac-flat-multicolor-icons
1tQFxzdvofkwFGbgVsPpK26xwdzj2_sZb|28-domino-icons
1g_SPcJNREwWoHYqafa6eKoZfzK0uqIwC|30-chess-icons
1PlL1o2a9vILmQ0g8PzykhVftLdbHijx1|30-christmas-party-icon-set
1wmZYMR6WXAGzrMOQy5RxwpO4YSHZ4kng|30-crustacean-icons
1k3xmSQNhKnXeRovM37eYb5gT9x92mn5O|30-emoji-icons
1kEa7UybMG5lj6Tu-I4BFU1pd0AgeoofS|30-medicine-basics-icon-pack
10TyFs9odZucoC_mTAehm2KC2tR1EOjhW|34-vegetables-and-fruit-clipart
1dONdvk7N1UfHRZAi7PTFb6fL1L73oqz0|40-european-cuisine-filled-line-icons
1y9VBOOXaVOFmehmR7Sh1ok650PNfjz73|40-job-promotion-icons-filled-line
1FMsyGEmhRt8dTk9LxON7bE8rZbNt9BHS|50-back-to-school-icons
11e272tS0hP9qC1e_ceDsJgj82fbagyUB|50-book-day-flat-multicolor-icons
12GsRn1a5dIvbjbOd4yzUVYvjxHPROxCE|50-cars-and-vehicles-flat-style-icons
1IqHENavfIIf-1OpJ3H7NeOUf2CrwP8xY|50-chess-icons
1u3PUQ1GrNSwGQmsDmfK6LoF3JG__6fzg|50-contact-flat-style-icons
1vU2Fw4bPeKWAF1N__4ACU0eGS5gpGLhE|50-education-and-school
1kr-5f9s1g3XzIpbxAvSR6Rmq5EFkWpDz|50-food-delivery-filled-line-icons
1Dewxf_fi1Xrgm5TLyEGIr01brEKHZ4dT|50-food-delivery-flat-multicolor-icons
1lbETw48-TgVGj-Xk30kJ0yFhLStHxoxU|50-industrial-process-blue-black-icons
1SRR7GL7W1CaJF67aN-VyZRUUQRpE68g2|50-math-symbols-flat-multicolor-icons-one
1jlxudQfH2ebnODEWS7dvirlJVdww5GNq|50-math-symbols-flat-multicolor-icons-two
1a4K_JECylSpMaU06jPtR8B2fSX5QP2RY|50-math-symbols-icons
1jfQNIH4Az4A5Fss83fuJJDMzyb0a92XI|50-natural-disaster-icons
1UnRiAgSmZdjmg9dQ4P6dDs9jBL0KShps|50-nuclear-energy-flat-multicolor-icons
149ewc0UV-ytIfLFE_FaWVtlQSHQS_EGC|50-online-money-service-icons
19GRwmX3JoUf-AvJUhI0DVWK5RbPl6-iN|50-organizational-development-filled-line-icons
1IwWDYANN4fpdX5t9mkXYozyS5nCa1Ckj|50-organizational-development-flat-icons
1OE4a2xBEqs4h4bVFT5MsuItnz26GaZkz|50-pet-shop-blue-black-icons
1SMlIvfDcovPioMHkuYjuj4SIaHZV3o0M|50-physics-filled-blue-black-icons
1bn4-qoSUi2o-nibHsjljspGKZ-8KbNJQ|50-physics-flat-multicolor-icons
16of1SaJaCxXTfWDaa1khTYb8PR308JU4|50-safari-filled-line-icons
1yKZTRJv1EZbsk7pAwxCgF9PSwsC4b70S|50-safari-flat-multicolor-icons
`;

const photoshop = `
1o_VV3M9MEGnQq1kWHA39lS1RqXSGsApG|3-5x2-business-card-mockup
13qCmJbiXlB3n0ovj9kayKD1BZXt_Hz_J|3d-text-effects-vol-2
1QPM2fyj3MekHIZBSiWBxKsllFETnk5Hd|4-magazine-mockups
1pK17jk3SvOx2xfh0P60jrqe-eMbPRFGT|5-business-card-mockups
1dX81GHoM16BXpGhy6W5-BjaX9SPHfe1t|6-a4-brochure-mockup
1P7bfeV0ttKr3oFMe0vME-eonui-v3d_Z|85x55-black-business-card-mockups
131mNArk1YcKx_cqO0567oJzSs8K8QwEO|100-photoshop-layer-styles-bundle-text-effect
1ADqFQUODzjWJddhnhwmT0JveNyRkonIp|a4-brochure-and-magazine-mockups
1JqR7DLIXZKV-r0u_a6U4KdVay76RLCY9|a4-magazine-mockup
1jJU0bv7XZCqxUaQcjfHct3syNFr4TS_6|agrey-creative-agency-website-template
1KASrx4lCuW1Pkiu4qSxJcv3sfyC8i6MI|annual-report-brochure
1tgn47egX2Uyji30LkLmSzlODvxKuq502|annual-report-template-one
15rh3wCrpTpcPWBdN8zQ3zMlcC-hExonO|annual-report-template-two
1rxdWj5CDJ4P_-XziXXeQU5OJV7xESOqI|auto-coverage-mobile-app-ui-kit
1m__GXXTIwvYqfkLyqHfHzUeI4SMhPF27|autumn-fall-mood-board-photo-collage-template
1UgOQvegpEJ2X3l6UUof9-d6rdeaoIMOy|beautiful-magazine-mockups
1PoMPH0q2oEZeVQtDkHXzDTxN7Zgo1BBX|book-mockup-one
1-yf7FvOc5cCE-sRSChKGQmCmfgJREpY6|book-mockup-two
1Z5Wb5n6WxxvhRvZB2haRIAgzVRBYrSfn|book-mockup-three
1YTCcYXcBaaNF1Z6-uuoO7i37gHTqrqbJ|book-mockup-four
1CV-YN7WOlLtDPYnRUPDVFJ_rTfRhSTTX|book-mockup-five
1tiigxoGQc0xbsRmypIAtbACyyeyOH75T|brand-guide-mockups
1dnLto2eIXBz82iTzVuhpNop-9f4M1T9x|brand-guidelines
1CRY6bHTjoKNBzPs9SSwPzjRdIKKbLA0y|brand-guidelines-template
1294BJpw1stYunKyIunOfc6HQLgSa1UYO|branding-business-card-mockup
11ziULcotiQ8yrg1CCvurIH3GaHyctZ1O|brochure-resume-tri-fold
1eTVocyalnfJHjawMiDMdYKo9hfEiwghJ|business-card-one
18hVXMLZr0Os8CYgou4LNrMZwhgijVQO5|business-card-two
1j_mQce8MGpp-bmd2UdZJnci0ojGnW8sr|business-card-three
1r7Sn8Fw1MV-rxWKPYaRGL9C1LkpvaZAg|business-card-four
1OVlFgfG_On-vFBTPuyUDp4MfQ1ac5aS6|business-card-five
1SYx747ATzWHmDHJZ221q-xQVrBLwRhX_|business-card-mockup-one
1xKcfrGsqBmLwOcKpAOlAwt1lVUbzU36F|business-card-mockup-two
13gTCoeQ769FZhWyZomqKBHRjazBkNB2B|business-card-mockup-three
1GvmxRdDmT10GIx8IX4QBCkByMj6FEcqa|business-card-mockup-four
16w17RzW_1TOkPHnwupcAcPXuYnsBZcE-|business-card-mockup-five
1JxrE-Wl6GTSfoGq0sZ1Ls6q1eCPYZ5s_|business-card-mockups
1NtQikojSUVjIEfSsILNXg9gNISOnUAfQ|business-card-mockups-v1
1EYlpIhvrQtP9eqvROgPVCQXPqpOPqki4|business-card-template-one
1xa4ooJ_olEbDFMf_CeHNQAJs-BG-xwg7|business-card-template-two
1ZfeD917ywrOCkjpXgifbULvGJxegZBHL|business-flyer
1-e_0Wst4Pw5YQCE0Ahxc-EiqOZytkCWO|business-linkedin-banner
1cFR606d507nX32R252em1Pt35HDDzPbK|business-plan-template
1-pV0bb_bEaRRqeO-SOi61Jp00Hy21_NV|business-services-instagram-post
1qKiE3OB5f0t5fnoIKXazfN2u83yY0Azb|care-companion-mobile-app-ui-kit
1eA-I565qIwt3sOm9PsNiFINVd8b7QeHW|catalog-brochure-template-one
1aNOo3OhTUSovIROE9fr_sWnZJsZqlVY0|catalog-brochure-template-two
1Renb2mr4UDidG5DTYxi8BlqaLgpNZ6TU|children-s-book-mockups
1tnTDfL2gMtF_nUA4kQecaPtJAz9QullC|classic-resume
19O7w09NuSg85gmmYgBfxMyu7gsuk0uF3|clean-cv-resume-ii
`;

function toItems(sourceFolder: Source, raw: string) {
  return raw.trim().split("\n").map((line): CatalogItem => {
    const [id, name] = line.trim().split("|");
    return { id, name, sourceFolder, size: "ZIP", modified: "2024", ...profileFor(sourceFolder, name) };
  });
}

function profileFor(source: Source, name: string): Profile {
  const text = name.toLowerCase();
  if (source === "capcut pro") {
    if (/(title|lower-third)/.test(text)) return motion("Títulos y lower thirds", ["títulos", "rótulos", "edición"], "Organiza la información en pantalla con rótulos y jerarquías animadas listas para editar.", ["Vídeos corporativos", "Tutoriales", "YouTube"], "geometry");
    if (/(transition|multiscreen)/.test(text)) return motion("Transiciones de vídeo", ["transiciones", "ritmo", "edición"], "Conecta planos con cambios de escena consistentes y acelera el montaje de piezas largas o cortas.", ["Reels", "YouTube", "Presentaciones"], "atmosphere");
    if (/(fire|explosion|flash|lightning|smoke|magic|action)/.test(text)) return motion("Efectos de movimiento", ["efectos", "energía", "impacto"], "Añade explosiones, destellos, fuego o energía visual para aumentar el énfasis de una secuencia.", ["Promociones", "Gaming", "Clips de impacto"], "ember");
    if (/(social|instagram|stories|youtuber|creator)/.test(text)) return motion("Paquete para social media", ["social media", "stories", "contenido"], "Acelera el montaje de contenido vertical y publicaciones con elementos pensados para redes.", ["Reels", "Stories", "Canales de marca"], "retro");
    if (/icon/.test(text)) return motion("Iconos animados", ["iconos", "motion", "interfaz"], "Aporta símbolos animados para explicar acciones, funciones y mensajes de forma directa.", ["Tutoriales", "Interfaces", "Vídeo explicativo"], "geometry", "Iconos & UI");
    if (/character/.test(text)) return motion("Personajes para explainer", ["personajes", "explainer", "vídeo"], "Da a los vídeos explicativos figuras y escenas que hacen más comprensible un relato complejo.", ["Onboarding", "Formación", "Vídeo explicativo"], "bird", "Modelado & 3D");
    return motion("Motion graphics", ["motion", "vídeo", "edición"], "Amplía la biblioteca de recursos de edición con elementos reutilizables y adaptables al ritmo de cada vídeo.", ["Edición de vídeo", "Presentaciones", "Social media"], "atmosphere");
  }
  if (source === "iconos") {
    const style = text.includes("3d") ? "3D" : text.includes("filled") ? "filled" : text.includes("line") ? "lineal" : text.includes("flat") ? "flat" : "temático";
    return { category: "Iconos & UI", resourceType: `Iconos ${style}`, tags: ["iconos", style, topic(text)], purpose: "Ofrece un conjunto coherente de símbolos para comunicar categorías, acciones y conceptos con velocidad y consistencia.", projects: ["Interfaces", "Infografías", "Presentaciones"], color: text.includes("3d") ? "geometry" : "flora" };
  }
  if (/(mockup|magazine|book|brochure|card)/.test(text)) return template("Mockup de presentación", ["mockup", "branding", "presentación"], "Permite visualizar una identidad o pieza editorial en un soporte realista antes de producirla.", ["Portfolios", "Presentaciones de marca", "Propuestas"], "material");
  if (/(ui-kit|website|app)/.test(text)) return template("Plantilla de interfaz", ["UI", "plantilla", "digital"], "Aporta una base de interfaz y estructura visual para proyectos digitales que requieren velocidad de arranque.", ["Apps", "Webs", "Prototipos"], "geometry");
  if (/(text-effect|layer-style)/.test(text)) return template("Efectos tipográficos", ["tipografía", "efectos", "Photoshop"], "Crea tratamientos de texto con presencia visual para titulares, campañas y piezas promocionales.", ["Portadas", "Anuncios", "Social media"], "ember");
  return template("Plantilla editorial", ["plantilla", "editorial", "branding"], "Da una estructura profesional para documentos, informes o piezas de marca personalizables.", ["Informes", "Identidad corporativa", "Presentaciones"], "material");
}

function motion(resourceType: string, tags: string[], purpose: string, projects: string[], color: string, category: ResourceCategory = "Video & Motion"): Profile {
  return { category, resourceType, tags, purpose, projects, color };
}

function template(resourceType: string, tags: string[], purpose: string, projects: string[], color: string): Profile {
  return { category: "Mockups & Plantillas", resourceType, tags, purpose, projects, color };
}

function topic(name: string) {
  if (/food|coffee|cuisine|vegetable/.test(name)) return "gastronomía";
  if (/school|education|book|math|physics/.test(name)) return "educación";
  if (/law|job|business|money|organizational/.test(name)) return "negocios";
  if (/zodiac|chess|domino|toy|wizard/.test(name)) return "ocio";
  if (/pet|safari|crustacean|disaster/.test(name)) return "naturaleza";
  return "temático";
}

export const individualPackages = [...toItems("capcut pro", capcut), ...toItems("iconos", icons), ...toItems("photoshop", photoshop)];
