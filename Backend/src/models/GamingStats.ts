import { Schema, model, Document } from 'mongoose';

export interface IGamingStats extends Document {
  playerName:     string;
  winRate:        number[];
  playstyleScores: {
    aggression:  number;
    teamwork:    number;
    strategy:    number;
    aim:         number;
    mapControl:  number;
    clutch:      number;
  };
  kdRatio:   number;
  totalKills: number;
  headshots: number;
  matches:   number;
  mvps:      number;
  lastUpdated: Date;
}

const GamingStatsSchema = new Schema<IGamingStats>(
  {
    playerName: { type: String, required: true, default: 'ABISHEK RAJ' },
    winRate:    { type: [Number], default: [58, 63, 71, 69, 76, 73] },
    playstyleScores: {
      aggression: { type: Number, default: 82 },
      teamwork:   { type: Number, default: 75 },
      strategy:   { type: Number, default: 90 },
      aim:        { type: Number, default: 88 },
      mapControl: { type: Number, default: 78 },
      clutch:     { type: Number, default: 85 },
    },
    kdRatio:    { type: Number, default: 2.4 },
    totalKills: { type: Number, default: 18420 },
    headshots:  { type: Number, default: 61 },
    matches:    { type: Number, default: 1240 },
    mvps:       { type: Number, default: 342 },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<IGamingStats>('GamingStats', GamingStatsSchema);
