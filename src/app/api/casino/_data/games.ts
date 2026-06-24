export interface FakeGame {
  active: boolean;
  demo: boolean;
  desktop_id: string;
  game_code: string;
  game_image: string;
  highlights: boolean;
  mobile_id: string;
  name: string;
  news: string | null;
  on_the_rise: string | null;
  provider: string;
  type: string;
}

export const casinoGames: FakeGame[] = [
  // ── SLOTS Copa do Mundo ──────────────────────────────────────────────
  {
    active: true, demo: true,
    desktop_id: "wc26_golden_boot", game_code: "wc26_golden_boot",
    game_image: "/cassino.png",
    highlights: true, mobile_id: "wc26_golden_boot",
    name: "Golden Boot — Copa 2026", news: "true", on_the_rise: "true",
    provider: "RosaBet Studios", type: "slot",
  },
  {
    active: true, demo: true,
    desktop_id: "wc26_hat_trick", game_code: "wc26_hat_trick",
    game_image: "/cassino.png",
    highlights: true, mobile_id: "wc26_hat_trick",
    name: "Hat Trick Fever", news: null, on_the_rise: "true",
    provider: "RosaBet Studios", type: "slot",
  },
  {
    active: true, demo: true,
    desktop_id: "wc26_penalty_king", game_code: "wc26_penalty_king",
    game_image: "/cassino.png",
    highlights: true, mobile_id: "wc26_penalty_king",
    name: "Penalty King", news: null, on_the_rise: null,
    provider: "RosaBet Studios", type: "slot",
  },
  {
    active: true, demo: false,
    desktop_id: "wc26_stadium_wild", game_code: "wc26_stadium_wild",
    game_image: "/cassino.png",
    highlights: true, mobile_id: "wc26_stadium_wild",
    name: "Stadium Wild Megaways", news: "true", on_the_rise: null,
    provider: "RosaBet Studios", type: "slot",
  },
  {
    active: true, demo: true,
    desktop_id: "wc26_world_cup_spin", game_code: "wc26_world_cup_spin",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_world_cup_spin",
    name: "World Cup Spin", news: null, on_the_rise: "true",
    provider: "RosaBet Studios", type: "slot",
  },
  {
    active: true, demo: true,
    desktop_id: "wc26_golazo", game_code: "wc26_golazo",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_golazo",
    name: "Golazo! Bonanza", news: null, on_the_rise: null,
    provider: "RosaBet Studios", type: "slot",
  },
  {
    active: true, demo: true,
    desktop_id: "wc26_us_canada_mx", game_code: "wc26_us_canada_mx",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_us_canada_mx",
    name: "USA — Canada — México Slots", news: "true", on_the_rise: null,
    provider: "RosaBet Studios", type: "slot",
  },
  {
    active: true, demo: false,
    desktop_id: "wc26_final_whistle", game_code: "wc26_final_whistle",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_final_whistle",
    name: "Final Whistle Jackpot", news: null, on_the_rise: "true",
    provider: "RosaBet Studios", type: "slot",
  },

  // ── ROLETA ───────────────────────────────────────────────────────────
  {
    active: true, demo: false,
    desktop_id: "wc26_roulette_vip", game_code: "wc26_roulette_vip",
    game_image: "/cassino.png",
    highlights: true, mobile_id: "wc26_roulette_vip",
    name: "Copa Roulette VIP", news: null, on_the_rise: null,
    provider: "RosaBet Studios", type: "roulette",
  },
  {
    active: true, demo: true,
    desktop_id: "wc26_roulette_classic", game_code: "wc26_roulette_classic",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_roulette_classic",
    name: "Roleta Clássica Copa 26", news: null, on_the_rise: "true",
    provider: "RosaBet Studios", type: "roulette",
  },

  // ── LIVE DEALER ──────────────────────────────────────────────────────
  {
    active: true, demo: false,
    desktop_id: "wc26_live_blackjack", game_code: "wc26_live_blackjack",
    game_image: "/cassino.png",
    highlights: true, mobile_id: "wc26_live_blackjack",
    name: "Live Blackjack Copa 2026", news: "true", on_the_rise: null,
    provider: "RosaBet Studios", type: "live_dealer",
  },
  {
    active: true, demo: false,
    desktop_id: "wc26_live_baccarat", game_code: "wc26_live_baccarat",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_live_baccarat",
    name: "Baccarat ao Vivo — Copa", news: null, on_the_rise: "true",
    provider: "RosaBet Studios", type: "live_dealer",
  },

  // ── BINGO ────────────────────────────────────────────────────────────
  {
    active: true, demo: true,
    desktop_id: "wc26_bingo_torcida", game_code: "wc26_bingo_torcida",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_bingo_torcida",
    name: "Bingo da Torcida", news: "true", on_the_rise: null,
    provider: "RosaBet Studios", type: "bingo",
  },
  {
    active: true, demo: true,
    desktop_id: "wc26_bingo_gol", game_code: "wc26_bingo_gol",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_bingo_gol",
    name: "Bingo do Gol", news: null, on_the_rise: "true",
    provider: "RosaBet Studios", type: "bingo",
  },

  // ── TABLE ────────────────────────────────────────────────────────────
  {
    active: true, demo: true,
    desktop_id: "wc26_poker_champions", game_code: "wc26_poker_champions",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_poker_champions",
    name: "Poker dos Campeões", news: null, on_the_rise: null,
    provider: "RosaBet Studios", type: "table",
  },
  {
    active: true, demo: false,
    desktop_id: "wc26_blackjack_mvp", game_code: "wc26_blackjack_mvp",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_blackjack_mvp",
    name: "Blackjack MVP", news: "true", on_the_rise: null,
    provider: "RosaBet Studios", type: "table",
  },

  // ── CASUAL ───────────────────────────────────────────────────────────
  {
    active: true, demo: true,
    desktop_id: "wc26_penalty_shootout", game_code: "wc26_penalty_shootout",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_penalty_shootout",
    name: "Penalty Shootout Rush", news: null, on_the_rise: "true",
    provider: "RosaBet Studios", type: "casual",
  },
  {
    active: true, demo: true,
    desktop_id: "wc26_free_kick", game_code: "wc26_free_kick",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_free_kick",
    name: "Free Kick Frenzy", news: "true", on_the_rise: null,
    provider: "RosaBet Studios", type: "casual",
  },

  // ── SCRATCH CARD ─────────────────────────────────────────────────────
  {
    active: true, demo: true,
    desktop_id: "wc26_scratch_troféu", game_code: "wc26_scratch_trofeu",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_scratch_trofeu",
    name: "Raspa e Vence — Troféu", news: "true", on_the_rise: null,
    provider: "RosaBet Studios", type: "scratch_card",
  },
  {
    active: true, demo: true,
    desktop_id: "wc26_scratch_camisa", game_code: "wc26_scratch_camisa",
    game_image: "/cassino.png",
    highlights: false, mobile_id: "wc26_scratch_camisa",
    name: "Raspa a Camisa", news: null, on_the_rise: "true",
    provider: "RosaBet Studios", type: "scratch_card",
  },
];
