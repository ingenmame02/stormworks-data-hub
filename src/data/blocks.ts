export type BlockSignalType = '音声' | '映像' | 'オン/オフ' | '数値' | '複合信号' | string;

export type BlockSignal = {
  type: BlockSignalType;
  name?: string;
  description: string;
};

export type BlockLogic = {
  input?: BlockSignal[];
  output?: BlockSignal[];
};

export type BlockData = {
  name: string;
  mass: number;
  cost: number;
  description: string;
  image: string;
  logic?: string | BlockLogic;
};

export type BlockCategory = {
  name: string;
  description?: string;
  blocks: BlockData[];
};

export const blockCategories: BlockCategory[] = [
  {
    name: 'BLOCKS',
    description: '',
    blocks: [
      {
        name: 'Block',
        mass: 1,
        cost: 2,
        description: '立方体型の基本的なブロックです。\nこのブロックの大きさは25cmです。\n6面すべてに部品を取り付けることができます。',
        image: '/img/Block_data/BLOCKS/Block.png',
        logic: 'なし',
      },
      {
        name: 'Pyramid 1x2',
        mass: 0.5,
        cost: 2,
        description: '1x2の三角錐型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。\n三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 1x2.png',
        logic: 'なし',
      },
      {
        name: 'Pyramid 1x4',
        mass: 1,
        cost: 4,
        description: '1x4の三角錐型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。\n三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 1x4.png',
        logic: 'なし',
      },
      {
        name: 'Pyramid 2x2',
        mass: 1,
        cost: 4,
        description: '2x2の三角錐型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。\n三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 2x2.png',
        logic: 'なし',
      },
      {
        name: 'Pyramid 2x4',
        mass: 2,
        cost: 8,
        description: '2x4の三角錐型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。\n三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 2x4.png',
        logic: 'なし',
      },
      {
        name: 'Pyramid 4x4',
        mass: 4,
        cost: 16,
        description: '4x4の三角錐型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。\n三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 4x4.png',
        logic: 'なし',
      },
      {
        name: 'Pyramid',
        mass: 0.25,
        cost: 1,
        description: '三角錐型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。\n三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid.png',
        logic: 'なし',
      },
      {
        name: 'Handle',
        mass: 1,
        cost: 5,
        description: '[q]や[e]を押してつかめる取っ手です。\n取っ手をつかんでいる時に[q]や[e]を押すと離せます。\n軽い乗り物は取っ手をつかんでそのまま動かせます。プレイヤーがとっての範囲外に移動したとき自動的に手を放します。',
        image: '/img/Block_data/BLOCKS/Handle.png',
        logic: 'なし',
      },
      {
        name: 'Wedge 1x2',
        mass: 1,
        cost: 2,
        description: '1x2の大きさの三角柱型のブロックです。\n斜面を除くすべての面に部品を取り付けることができます。',
        image: '/img/Block_data/BLOCKS/Wedge 1x2.png',
        logic: 'なし',
      },
      {
        name: 'Wedge 1x4',
        mass: 1,
        cost: 4,
        description: '1x4の大きさの三角柱型のブロックです。\n斜面を除くすべての面に部品を取り付けることができます。',
        image: '/img/Block_data/BLOCKS/Wedge 1x4.png',
        logic: 'なし',
      },
      {
        name: 'Wedge',
        mass: 0.5,
        cost: 2,
        description: '三角柱型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。',
        image: '/img/Block_data/BLOCKS/Wedge.png',
        logic: 'なし',
      },
      {
        name: 'Ladder',
        mass: 5,
        cost: 3,
        description: '一段のはしごです。\n梯子を複数個重ねて設置することで、任意の長さのはしごになります。\n[f]を押して梯子の登り下りをし、[f]や[space]を押すことで梯子から離れます。\n頂上に達すると自動で梯子から離れます。',
        image: '/img/Block_data/BLOCKS/Ladder.png',
        logic: 'なし',
      },
      {
        name: 'Physics Flooder',
        mass: 1,
        cost: 20,
        description: '処理の最適化のために、密閉空間が質量がないブロックで埋め尽くされていると見なすように印を付けるブロックです。\n密閉された空間が質量がないブロックで埋め尽くされているとシステムが見なすことで乗り物の機能を失うことなく処理の軽量化ができます。',
        image: '/img/Block_data/BLOCKS/Physics Flooder.png',
        logic: 'なし',
      },
      {
        name: 'Inverse Pyramid 1x2',
        mass: 1.5,
        cost: 2,
        description: '1×2の直方体から三角錐を切り取った形の基本的なブロックです。\n斜面を除く全ての面に部品を取付けられます。\n逆三角ブロックは斜めブロックや三角ブロックの隙間を埋めるのに便利です。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 1x2.png',
        logic: 'なし',
      },
      {
        name: 'Inverse Pyramid 1x4',
        mass: 3,
        cost: 4,
        description: '1×4の直方体から三角錐を切り取った形の基本的なブロックです。\n斜面を除く全ての面に部品を取付けられます。\n逆三角ブロックは斜めブロックや三角ブロックの隙間を埋めるのに便利です。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 1x4.png',
        logic: 'なし',
      },
      {
        name: 'Inverse Pyramid 2x2',
        mass: 3,
        cost: 4,
        description: '2×2の直方体から三角錐を切り取った形の基本的なブロックです。\n斜面を除く全ての面に部品を取付けられます。\n三角ブロックは斜めブロックの角の接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 2x2.png',
        logic: 'なし',
      },
      {
        name: 'Inverse Pyramid 2x4',
        mass: 6,
        cost: 8,
        description: '2×4の直方体から三角錐を切り取った形の基本的なブロックです。\n斜面を除く全ての面に部品を取付けられます。\n三角ブロックは斜めブロックの角の接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 2x4.png',
        logic: 'なし',
      },
      {
        name: 'Inverse Pyramid 4x4',
        mass: 12,
        cost: 16,
        description: '4×4の直方体から三角錐を切り取った形の基本的なブロックです。\n斜面を除く全ての面に部品を取付けられます。\n三角ブロックは斜めブロックの角の接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 4x4.png',
        logic: 'なし',
      },
      {
        name: 'Inverse Pyramid',
        mass: 0.75,
        cost: 2,
        description: '立方体から三角錐を切り取った形の基本的なブロックです。\n斜面を除く全ての面に部品を取付けられます。\n逆三角ブロックは斜めブロックや三角ブロックの隙間を埋めるのに便利です。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid.png',
        logic: 'なし',
      },
      {
        name: 'Pipe T-Piece',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプのT字部分です。',
        image: '/img/Block_data/BLOCKS/Pipe T-Piece.png',
        logic: 'なし',
      },
      {
        name: 'Pipe T-Piece (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプのT字部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe T-Piece (Enclosed).png',
        logic: 'なし',
      },
      {
        name: 'Pipe Omni',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの全方向分岐部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Omni.png',
        logic: 'なし',
      },
      {
        name: 'Pipe Omni (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの全方向分岐部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Omni (Enclosed).png',
        logic: 'なし',
      },
      {
        name: 'Pipe Cross',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの十字部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Cross.png',
        logic: 'なし',
      },
      {
        name: 'Pipe Cross (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの十字部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Cross (Enclosed).png',
        logic: 'なし',
      },
      {
        name: 'Pipe Straight',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの直線部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Straight.png',
        logic: 'なし',
      },
      {
        name: 'Pipe Straight (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの直線部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Straight (Enclosed).png',
        logic: 'なし',
      },
      {
        name: 'Pipe Angle',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Angle.png',
        logic: 'なし',
      },
      {
        name: 'Pipe Angle (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Angle (Enclosed).png',
        logic: 'なし',
      },
      {
        name: 'Pipe T-Piece Corner',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角T字部分です。',
        image: '/img/Block_data/BLOCKS/Pipe T-Piece Corner.png',
        logic: 'なし',
      },
      {
        name: 'Pipe T-Piece Corner (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角T字部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe T-Piece Corner (Enclosed).png',
        logic: 'なし',
      },
      {
        name: 'Pipe Angle Corner',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角分岐部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Angle Corner.png',
        logic: 'なし',
      },
      {
        name: 'Pipe Angle Corner (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角分岐部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Angle Corner (Enclosed).png',
        logic: 'なし',
      },
      {
        name: 'Pipe Cross Corner',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角十字部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Cross Corner.png',
        logic: 'なし',
      },
      {
        name: 'Pipe Cross Corner (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角十字部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Cross Corner (Enclosed).png',
        logic: 'なし',
      },
      {
        name: 'Weight Block',
        mass: 10,
        cost: 5,
        description: '普通のブロックよりも重いブロックです。\n重りブロックを使えば簡単に重心を調整できるので、バランス調整や安定性のために役立ちます。',
        image: '/img/Block_data/BLOCKS/Weight Block.png',
        logic: 'なし',
      },
      {
        name: 'Stair Top',
        mass: 6,
        cost: 20,
        description: '平らな床と接合する階段の上端部分です。',
        image: '/img/Block_data/BLOCKS/Stair Top.png',
        logic: 'なし',
      },
      {
        name: 'Stair Step',
        mass: 6,
        cost: 20,
        description: '重ねて設置すると階段を作成できる階段の一部分です。',
        image: '/img/Block_data/BLOCKS/Stair Step.png',
        logic: 'なし',
      },
      

    ],
  },
  {
    name: 'VEHICLE CONTROL',
    description: '',
    blocks: [
      {
        name: 'Keel (Medium)',
        mass: 1000,
        cost: 1000,
        description: '航海のための船の中型のキールです。\nキールが水中にある場合は、船が横転する力に抵抗するため船が直立しやすくなります。\nまた、キールは横方向への移動も防ぐため、船はキールの向きと同じ方向に動くことになります。\nこれにより風の向きにかかわらず、帆船が目的の方向に進めます。',
        image: '/img/Block_data/VEHICLE CONTROL/Keel (Medium).png',
        logic: 'なし',
      },
      {
        name: 'Keel (Large)',
        mass: 2000,
        cost: 2000,
        description: '航海のための船の大型のキールです。\nキールが水中にある場合は、船が横転する力に抵抗するため船が直立しやすくなります。\nまた、キールは横方向への移動も防ぐため、船はキールの向きと同じ方向に動くことになります。\nこれにより風の向きにかかわらず、帆船が目的の方向に進めます。',
        image: '/img/Block_data/VEHICLE CONTROL/Keel (Large).png',
        logic: 'なし',
      },
      {
        name: 'Keel (Small)',
        mass: 500,
        cost: 300,
        description: '航海のための船の小型のキールです。\nキールが水中にある場合は、船が横転する力に抵抗するため船が直立しやすくなります。\nまた、キールは横方向への移動も防ぐため、船はキールの向きと同じ方向に動くことになります。\nこれにより風の向きにかかわらず、帆船が目的の方向に進めます。',
        image: '/img/Block_data/VEHICLE CONTROL/Keel (Small).png',
        logic: 'なし',
      },
      {
        name: 'Saddle Seat',
        mass: 5,
        cost: 75,
        description: '運転ハンドル付きの小型のサドルです。\n[f]を押して座ったり立ったりします。\n意識がある人を担いでいる時に[f]を押すとその人を座らせます。',
        image: '/img/Block_data/VEHICLE CONTROL/Saddle Seat.png',
        logic: {
          input: [
            { type: '音声', name: 'ヘッドセット音声信号入力', description: 'ヘッドセット音声信号入力' },
            { type: '映像', name: 'ヘッドセット映像信号入力', description: 'ヘッドセット映像信号入力' },
          ],
          output: [
            { type: 'オン/オフ', name: '使用中', description: '使用中' },
            { type: 'オン/オフ', name: 'トリガー[space]', description: 'トリガー[space]' },
            { type: '数値', name: '水平視線方向', description: '-0.35（左）～0.35（右）（-126°～126°）座っているプレイヤーの水平視線方向' },
            { type: '数値', name: '垂直視線方向', description: '-0.2（下）～0.2（上）（-72°～72°）座っているプレイヤーの垂直視線方向' },
            { type: '数値', name: ' [a]/[d]（軸１）', description: '-1～1 [a]で数値下降、[d]で数値上昇' },
            { type: '数値', name: ' [w]/[s]（軸１）', description: '-1～1 [w]で数値下降、[s]で数値上昇' },
            { type: '数値', name: ' [←]/[→]（軸１）', description: '-1～1 [←]で数値下降、[→]で数値上昇' },
            { type: '数値', name: ' [↑]/[↓]（軸１）', description: '-1～1 [↑]で数値下降、[↓]で数値上昇' },
            { type: 'オン/オフ', name: '（ホットキー１～６）', description: 'On/Offを出力' },
            { type: '複合信号', name: '座席情報', description: '操作情報を複合データで出力\n・Number channel 1～4   Axis 1～4の数値を出力\n・Number channel 9　     Look Xの数値を出力\n・Number channel 10   　Look Yの数値を出力\n・On/Off channel 1～6	Hotkey1～6のオンオフ信号を出力\n・On/Off channel 31	Triggerのオンオフ信号を出力\n・On/Off channel 32	Occupiedのオンオフ信号を出力' },
            { type: '音声', name: 'ヘッドセット音声信号出力', description: 'ヘッドセット音声信号出力' },
          ],
        },
      },
    ],
  },
];