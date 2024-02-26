import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface MatchResult {
	deck: mongoose.Types.ObjectId; // Reference to the Deck document
	win: boolean;
	loss: boolean;
	win_turn?: number;
	opening_hand: number; // Array of card IDs
	turn_order: number[];
	best_card: mongoose.Types.ObjectId; // Reference to the Card document
	notes: string;
	match_type: string;
	date: Date;
}

const matchResultSchema = new Schema<MatchResult>({
	deck: { type: Schema.Types.ObjectId, ref: 'Deck', required: true },
	win: { type: Boolean, required: true },
	loss: { type: Boolean, required: true },
	win_turn: Number,
	opening_hand: Number,
	turn_order: Number,
	best_card: { type: Schema.Types.ObjectId, ref: 'Card' },
	notes: String,
	date: { type: Date, required: true },
	match_type: String,
});

const MatchResult = model<MatchResult>('MatchResult', matchResultSchema);

// export default MatchResult;
module.exports = MatchResult;
// Path: src/models/mongoDB/user.model.ts
