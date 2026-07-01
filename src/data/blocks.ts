export type BlockSignalType = '音声' | '映像' | 'オン/オフ' | '数値' | '複合信号' | '電力' |'動力'|'流体'|string;

export type BlockSignal = {
  type: BlockSignalType;
  name?: string;
  description: string;
};

export type BlockLogic = {
  input?: BlockSignal[];
  output?: BlockSignal[];
};

export type BlockSettings = {
  name?: string;
  description: string;
};

export type BlockData = {
  name: string;
  mass: number;
  cost: number;
  description: string;
  image: string;
  logic?: string | BlockLogic;
  settings?: string | BlockSettings[];
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
        settings: 'なし',
      },
      {
        name: 'Pyramid 1x2',
        mass: 0.5,
        cost: 2,
        description: '1x2の三角錐型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。\n三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 1x2.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pyramid 1x4',
        mass: 1,
        cost: 4,
        description: '1x4の三角錐型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。\n三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 1x4.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pyramid 2x2',
        mass: 1,
        cost: 4,
        description: '2x2の三角錐型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。\n三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 2x2.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pyramid 2x4',
        mass: 2,
        cost: 8,
        description: '2x4の三角錐型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。\n三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 2x4.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pyramid 4x4',
        mass: 4,
        cost: 16,
        description: '4x4の三角錐型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。\n三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 4x4.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pyramid',
        mass: 0.25,
        cost: 1,
        description: '三角錐型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。\n三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Handle',
        mass: 1,
        cost: 5,
        description: '[q]や[e]を押してつかめる取っ手です。\n取っ手をつかんでいる時に[q]や[e]を押すと離せます。\n軽い乗り物は取っ手をつかんでそのまま動かせます。プレイヤーがとっての範囲外に移動したとき自動的に手を放します。',
        image: '/img/Block_data/BLOCKS/Handle.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Wedge 1x2',
        mass: 1,
        cost: 2,
        description: '1x2の大きさの三角柱型のブロックです。\n斜面を除くすべての面に部品を取り付けることができます。',
        image: '/img/Block_data/BLOCKS/Wedge 1x2.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Wedge 1x4',
        mass: 1,
        cost: 4,
        description: '1x4の大きさの三角柱型のブロックです。\n斜面を除くすべての面に部品を取り付けることができます。',
        image: '/img/Block_data/BLOCKS/Wedge 1x4.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Wedge',
        mass: 0.5,
        cost: 2,
        description: '三角柱型の基本的なブロックです。\n斜面を除くすべての面に部品を取り付けることができます。',
        image: '/img/Block_data/BLOCKS/Wedge.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Ladder',
        mass: 5,
        cost: 3,
        description: '一段のはしごです。\n梯子を複数個重ねて設置することで、任意の長さのはしごになります。\n[f]を押して梯子の登り下りをし、[f]や[space]を押すことで梯子から離れます。\n頂上に達すると自動で梯子から離れます。',
        image: '/img/Block_data/BLOCKS/Ladder.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Physics Flooder',
        mass: 1,
        cost: 20,
        description: '処理の最適化のために、密閉空間が質量がないブロックで埋め尽くされていると見なすように印を付けるブロックです。\n密閉された空間が質量がないブロックで埋め尽くされているとシステムが見なすことで乗り物の機能を失うことなく処理の軽量化ができます。',
        image: '/img/Block_data/BLOCKS/Physics Flooder.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Inverse Pyramid 1x2',
        mass: 1.5,
        cost: 2,
        description: '1×2の直方体から三角錐を切り取った形の基本的なブロックです。\n斜面を除く全ての面に部品を取付けられます。\n逆三角ブロックは斜めブロックや三角ブロックの隙間を埋めるのに便利です。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 1x2.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Inverse Pyramid 1x4',
        mass: 3,
        cost: 4,
        description: '1×4の直方体から三角錐を切り取った形の基本的なブロックです。\n斜面を除く全ての面に部品を取付けられます。\n逆三角ブロックは斜めブロックや三角ブロックの隙間を埋めるのに便利です。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 1x4.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Inverse Pyramid 2x2',
        mass: 3,
        cost: 4,
        description: '2×2の直方体から三角錐を切り取った形の基本的なブロックです。\n斜面を除く全ての面に部品を取付けられます。\n三角ブロックは斜めブロックの角の接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 2x2.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Inverse Pyramid 2x4',
        mass: 6,
        cost: 8,
        description: '2×4の直方体から三角錐を切り取った形の基本的なブロックです。\n斜面を除く全ての面に部品を取付けられます。\n三角ブロックは斜めブロックの角の接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 2x4.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Inverse Pyramid 4x4',
        mass: 12,
        cost: 16,
        description: '4×4の直方体から三角錐を切り取った形の基本的なブロックです。\n斜面を除く全ての面に部品を取付けられます。\n三角ブロックは斜めブロックの角の接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 4x4.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Inverse Pyramid',
        mass: 0.75,
        cost: 2,
        description: '立方体から三角錐を切り取った形の基本的なブロックです。\n斜面を除く全ての面に部品を取付けられます。\n逆三角ブロックは斜めブロックや三角ブロックの隙間を埋めるのに便利です。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe T-Piece',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプのT字部分です。',
        image: '/img/Block_data/BLOCKS/Pipe T-Piece.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe T-Piece (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプのT字部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe T-Piece (Enclosed).png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe Omni',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの全方向分岐部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Omni.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe Omni (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの全方向分岐部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Omni (Enclosed).png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe Cross',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの十字部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Cross.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe Cross (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの十字部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Cross (Enclosed).png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe Straight',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの直線部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Straight.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe Straight (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの直線部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Straight (Enclosed).png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe Angle',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Angle.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe Angle (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Angle (Enclosed).png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe T-Piece Corner',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角T字部分です。',
        image: '/img/Block_data/BLOCKS/Pipe T-Piece Corner.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe T-Piece Corner (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角T字部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe T-Piece Corner (Enclosed).png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe Angle Corner',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角分岐部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Angle Corner.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe Angle Corner (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角分岐部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Angle Corner (Enclosed).png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe Cross Corner',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角十字部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Cross Corner.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Pipe Cross Corner (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角十字部分です。\nブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Cross Corner (Enclosed).png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Weight Block',
        mass: 10,
        cost: 5,
        description: '普通のブロックよりも重いブロックです。\n重りブロックを使えば簡単に重心を調整できるので、バランス調整や安定性のために役立ちます。',
        image: '/img/Block_data/BLOCKS/Weight Block.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Stair Top',
        mass: 6,
        cost: 20,
        description: '平らな床と接合する階段の上端部分です。',
        image: '/img/Block_data/BLOCKS/Stair Top.png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Stair Step',
        mass: 6,
        cost: 20,
        description: '重ねて設置すると階段を作成できる階段の一部分です。',
        image: '/img/Block_data/BLOCKS/Stair Step.png',
        logic: 'なし',
        settings: 'なし',
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
        settings: 'なし',
      },
      {
        name: 'Keel (Large)',
        mass: 2000,
        cost: 2000,
        description: '航海のための船の大型のキールです。\nキールが水中にある場合は、船が横転する力に抵抗するため船が直立しやすくなります。\nまた、キールは横方向への移動も防ぐため、船はキールの向きと同じ方向に動くことになります。\nこれにより風の向きにかかわらず、帆船が目的の方向に進めます。',
        image: '/img/Block_data/VEHICLE CONTROL/Keel (Large).png',
        logic: 'なし',
        settings: 'なし',
      },
      {
        name: 'Keel (Small)',
        mass: 500,
        cost: 300,
        description: '航海のための船の小型のキールです。\nキールが水中にある場合は、船が横転する力に抵抗するため船が直立しやすくなります。\nまた、キールは横方向への移動も防ぐため、船はキールの向きと同じ方向に動くことになります。\nこれにより風の向きにかかわらず、帆船が目的の方向に進めます。',
        image: '/img/Block_data/VEHICLE CONTROL/Keel (Small).png',
        logic: 'なし',
        settings: 'なし',
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
        settings: 'なし',
      },
      {
        name: 'Gyro',
        mass: 10,
        cost: 500,
        description: 'ヘリコプターのピッチ,ロール,ヨー,上/下を簡単に制御できるジャイロです。/nローターやエンジンにジャイロからの信号を入力することで安定した制御が行えます、「ホバーモード」ノードヘオン信号を入力すると自動的に乗り物を水平に保ちます。',
        image: '/img/Block_data/VEHICLE CONTROL/Gyro.png',
        logic: {
          input: [
            { type: '数値', name: 'Roll（ロール）', description: '-1～1 目標ロール速度を入力' },
            { type: '数値', name: 'Pitch（ピッチ）', description: '-1～1 目標ピッチ速度を入力' },
            { type: '数値', name: 'Yaw（ヨー）', description: '-1～1 目標ヨー速度を入力' },
            { type: '数値', name: 'Up/Down（上昇下降）', description: '-1～1 目標垂直速度を入力' },
            { type: 'オン/オフ', name: 'Auto-hover（自動ホバー）', description: 'オン信号を入力している間、自動ホバー回路を有効' },
            { type: '電力', name: '動作用電力', description: '動作用電力' },
          ],
          output: [
            { type: '数値', name: ' Stabilised Roll（ロール）', description: '-1～1 安定したロール速度値を出力' },
            { type: '数値', name: ' Stabilised Pitch（ピッチ）', description: '-1～1 安定したピッチ速度値を出力' },
            { type: '数値', name: ' Stabilised Yaw（ヨー）', description: '-1～1 安定したヨー速度値を出力' },
            { type: '数値', name: ' Stabilised Up/Down（上昇下降）', description: '-1～1 安定した垂直速度値を出力' },
          ],
        },
        settings: 'なし',
      },
      {
        name: 'Ski',
        mass: 12,
        cost: 200,
        description: '大型の乗り物用スキー板です。\nスキー板の長辺方向にはよく滑りますが、短辺方向には滑りにくいです。',
        image: '/img/Block_data/VEHICLE CONTROL/Ski.png',
        logic: {
          input:[
            { type: '数値', name: '操舵', description: '-1～1 スキー板の左右角度の設定値(0が中央)' }
          ]
        },
        settings: [
          { name: 'バネ強さ', description: '0～100％ ヒンジ部バネの強さを設定' },
        ],
      },
      {
        name: 'Ski (Small)',
        mass: 8,
        cost: 100,
        description: '小型の乗り物用スキー板です。\nスキー板の長辺方向にはよく滑りますが、短辺方向には滑りにくいです。',
        image: '/img/Block_data/VEHICLE CONTROL/Ski (Small).png',
        logic: {
          input:[
            { type: '数値', name: '操舵', description: '-1～1 スキー板の左右角度の設定値(0が中央)' }
          ]
        },
        settings: [
          { name: 'バネ強さ', description: '0～100％ ヒンジ部バネの強さを設定' },
        ],
      },
      {
        name: 'Wheel 3x3',
        mass: 10,
        cost: 100,
        description: '操舵とブレーキができ、動力を受け取って走る小型のタイヤです。\nエンジンからの動力を受け取ると前後に回転します。\n「操舵」ノードからの数値信号でタイヤを左右に曲げます。\n「ブレーキ」や「可変ブレーキ」ノードの入力でブレーキをかけます。\nタイヤはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wheel 3x3.png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: '	オンで車輪を固定する' },
            { type: '数値', name: '操舵', description: '-1～1 タイヤの左右角度の設定値(0が中央)' },
            { type: '数値', name: '可変ブレーキ', description: '0～1 ブレーキの強さを設定' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'タイヤ種類', description: 'All Round / High Speed / High Grip' },
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'タイヤ圧', description: '1～100％　タイヤ空気圧を設定' },
          
        ],
      },
      {
        name: 'Wheel 3x3 (Suspension)',
        mass: 15,
        cost: 150,
        description: '操舵とブレーキができ、動力を受け取って走る小型のタイヤです。\n衝撃を吸収するサスペンションがついています。\nエンジンからの動力を受け取ると前後に回転します。\n「操舵」ノードからの数値信号でタイヤを左右に曲げます。\n「ブレーキ」や「可変ブレーキ」ノードの入力でブレーキをかけます。\nタイヤはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wheel 3x3 (Suspension).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: '	オンで車輪を固定する' },
            { type: '数値', name: '操舵', description: '-1～1 タイヤの左右角度の設定値(0が中央)' },
            { type: '数値', name: '可変ブレーキ', description: '0～1 ブレーキの強さを設定' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'タイヤ種類', description: 'All Round / High Speed / High Grip' },
          { name: '剛性', description: '1～100％　サスペンションの硬さを設定' },
          { name: '減衰', description: '1～100％　サスペンションの張りを設定' },
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'タイヤ圧', description: '1～100％　タイヤ空気圧を設定' },

        ],
      },
      {
        name: 'Wheel 5x5',
        mass: 20,
        cost: 150,
        description: '操舵とブレーキができ、動力を受け取って走る中型のタイヤです。\nエンジンからの動力を受け取ると前後に回転します。\n「操舵」ノードからの数値信号でタイヤを左右に曲げます。\n「ブレーキ」や「可変ブレーキ」ノードの入力でブレーキをかけます。\nタイヤはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wheel 5x5.png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: '	オンで車輪を固定する' },
            { type: '数値', name: '操舵', description: '-1～1 タイヤの左右角度の設定値(0が中央)' },
            { type: '数値', name: '可変ブレーキ', description: '0～1 ブレーキの強さを設定' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'タイヤ種類', description: 'All Round / High Speed / High Grip' },
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'タイヤ圧', description: '1～100％　タイヤ空気圧を設定' },
          
        ],
      },
      {
        name: 'Wheel 5x5 (Suspension)',
        mass: 30,
        cost: 200,
        description: '操舵とブレーキができ、動力を受け取って走る中型のタイヤです。\n衝撃を吸収するサスペンションがついています。\nエンジンからの動力を受け取ると前後に回転します。\n「操舵」ノードからの数値信号でタイヤを左右に曲げます。\n「ブレーキ」や「可変ブレーキ」ノードの入力でブレーキをかけます。\nタイヤはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wheel 5x5 (Suspension).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: '	オンで車輪を固定する' },
            { type: '数値', name: '操舵', description: '-1～1 タイヤの左右角度の設定値(0が中央)' },
            { type: '数値', name: '可変ブレーキ', description: '0～1 ブレーキの強さを設定' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'タイヤ種類', description: 'All Round / High Speed / High Grip' },
          { name: '剛性', description: '1～100％　サスペンションの硬さを設定' },
          { name: '減衰', description: '1～100％　サスペンションの張りを設定' },
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'タイヤ圧', description: '1～100％　タイヤ空気圧を設定' },

        ],
      },
      {
        name: 'Wheel 7x7',
        mass: 40,
        cost: 200,
        description: '操舵とブレーキができ、動力を受け取って走る大型のタイヤです。\nエンジンからの動力を受け取ると前後に回転します。\n「操舵」ノードからの数値信号でタイヤを左右に曲げます。\n「ブレーキ」や「可変ブレーキ」ノードの入力でブレーキをかけます。\nタイヤはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wheel 7x7.png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: '	オンで車輪を固定する' },
            { type: '数値', name: '操舵', description: '-1～1 タイヤの左右角度の設定値(0が中央)' },
            { type: '数値', name: '可変ブレーキ', description: '0～1 ブレーキの強さを設定' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'タイヤ種類', description: 'All Round / High Speed / High Grip' },
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'タイヤ圧', description: '1～100％　タイヤ空気圧を設定' },
          
        ],
      },
      {
        name: 'Wheel 7x7 (Suspension)',
        mass: 60,
        cost: 250,
        description: '操舵とブレーキができ、動力を受け取って走る大型のタイヤです。\n衝撃を吸収するサスペンションがついています。\nエンジンからの動力を受け取ると前後に回転します。\n「操舵」ノードからの数値信号でタイヤを左右に曲げます。\n「ブレーキ」や「可変ブレーキ」ノードの入力でブレーキをかけます。\nタイヤはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wheel 7x7 (Suspension).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: '	オンで車輪を固定する' },
            { type: '数値', name: '操舵', description: '-1～1 タイヤの左右角度の設定値(0が中央)' },
            { type: '数値', name: '可変ブレーキ', description: '0～1 ブレーキの強さを設定' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'タイヤ種類', description: 'All Round / High Speed / High Grip' },
          { name: '剛性', description: '1～100％　サスペンションの硬さを設定' },
          { name: '減衰', description: '1～100％　サスペンションの張りを設定' },
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'タイヤ圧', description: '1～100％　タイヤ空気圧を設定' },

        ],
      },
      {
        name: 'Wheel 9x9',
        mass: 80,
        cost: 250,
        description: '操舵とブレーキができ、動力を受け取って走る特大型のタイヤです。\nエンジンからの動力を受け取ると前後に回転します。\n「操舵」ノードからの数値信号でタイヤを左右に曲げます。\n「ブレーキ」や「可変ブレーキ」ノードの入力でブレーキをかけます。\nタイヤはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wheel 9x9.png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: '	オンで車輪を固定する' },
            { type: '数値', name: '操舵', description: '-1～1 タイヤの左右角度の設定値(0が中央)' },
            { type: '数値', name: '可変ブレーキ', description: '0～1 ブレーキの強さを設定' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'タイヤ種類', description: 'All Round / High Speed / High Grip' },
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'タイヤ圧', description: '1～100％　タイヤ空気圧を設定' },
          
        ],
      },
      {
        name: 'Wheel 9x9 (Suspension)',
        mass: 120,
        cost: 300,
        description: '操舵とブレーキができ、動力を受け取って走る特大型のタイヤです。\n衝撃を吸収するサスペンションがついています。\nエンジンからの動力を受け取ると前後に回転します。\n「操舵」ノードからの数値信号でタイヤを左右に曲げます。\n「ブレーキ」や「可変ブレーキ」ノードの入力でブレーキをかけます。\nタイヤはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wheel 9x9 (Suspension).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: '	オンで車輪を固定する' },
            { type: '数値', name: '操舵', description: '-1～1 タイヤの左右角度の設定値(0が中央)' },
            { type: '数値', name: '可変ブレーキ', description: '0～1 ブレーキの強さを設定' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'タイヤ種類', description: 'All Round / High Speed / High Grip' },
          { name: '剛性', description: '1～100％　サスペンションの硬さを設定' },
          { name: '減衰', description: '1～100％　サスペンションの張りを設定' },
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'タイヤ圧', description: '1～100％　タイヤ空気圧を設定' },

        ],
      },
      {
        name: 'Large Landing Wheel',
        mass: 8,
        cost: 50,
        description: '自由に回転する大型のタイヤです。\nこのタイヤは動力を受け取って走ったり、操舵したりはできませんが、オン信号や数値信号でブレーキをかけることはできます。',
        image: '/img/Block_data/VEHICLE CONTROL/Large Landing Wheel.png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: '	オンで車輪を固定する' },
            { type: '数値', name: '可変ブレーキ', description: '0～1 ブレーキの強さを設定' },
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
        ],
      },
      {
        name: 'Wheel Coaster',
        mass: 4,
        cost: 25,
        description: '自由に回転する小型のタイヤです。\nこのタイヤは動力を受け取って走ったり、操舵したりはできませんが、オン信号や数値信号でブレーキをかけることはできます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wheel Coaster.png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: '	オンで車輪を固定する' },
            { type: '数値', name: '可変ブレーキ', description: '0～1 ブレーキの強さを設定' },
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
        ],
      },
      {
        name: 'Medium Wheel',
        mass: 10,
        cost: 100,
        description: '操舵とブレーキができ、動力を受け取って走る大型のタイヤです。\nエンジンからの動力を受け取ると前後に回転します。\n「操舵」ノードからの数値信号でタイヤを左右に曲げます。\n「ブレーキ」や「可変ブレーキ」ノードの入力でブレーキをかけます。',
        image: '/img/Block_data/VEHICLE CONTROL/Medium Wheel.png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: '	オンで車輪を固定する' },
            { type: '数値', name: '可変ブレーキ', description: '0～1 ブレーキの強さを設定' },
            { type: '数値', name: '操舵', description: '-1～1 タイヤの左右角度の設定値(0が中央)' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
        ],
      },
      {
        name: 'Small Wheel',
        mass: 5,
        cost: 30,
        description: '操舵とブレーキができ、動力を受け取って走る小型のタイヤです。\nエンジンからの動力を受け取ると前後に回転します。\n「操舵」ノードからの数値信号でタイヤを左右に曲げます。\n「ブレーキ」や「可変ブレーキ」ノードの入力でブレーキをかけます。',
        image: '/img/Block_data/VEHICLE CONTROL/Small Wheel.png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: '	オンで車輪を固定する' },
            { type: '数値', name: '可変ブレーキ', description: '0～1 ブレーキの強さを設定' },
            { type: '数値', name: '操舵', description: '-1～1 タイヤの左右角度の設定値(0が中央)' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
        ],
      },
      {
        name: 'Pilot Seat (HOTAS)',
        mass: 50,
        cost: 250,
        description: '座っているプレイヤーのキーボード入力などで乗り物を操作できる座席です。\nキーボードなどで-1から1の範囲を操作できる数値信号を8個、オン/オフ信号を49個提供し、座っている人の視点方向も出力されます。[f]を押して座ったり立ったりします。\nHOTASとはパイロットが操縦桿から手を離さずにレーダーや兵器の操作ができるシステムのことです。\nより多くの軸やボタンを使用するには多くのボタンを備えるゲームパッドが必要になります。\nキーの挙動などはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Pilot Seat (HOTAS).png',
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
            { type: 'オン/オフ', name: '（ホットキー１～48）', description: 'On/Offを出力' },
            { type: '複合信号', name: '座席情報', description: '操作情報を複合データで出力\n・Number channel 1～4   Axis 1～4の数値を出力\n・Number channel 9　     Look Xの数値を出力\n・Number channel 10   　Look Yの数値を出力\n・On/Off channel 1～6	Hotkey1～6のオンオフ信号を出力\n・On/Off channel 31	Triggerのオンオフ信号を出力\n・On/Off channel 32	Occupiedのオンオフ信号を出力' },
            { type: '音声', name: 'ヘッドセット音声信号出力', description: 'ヘッドセット音声信号出力' },
          ],
        },
        settings: 'なし',
      },
      {
        name: 'Compact Pilot Seat',
        mass: 7,
        cost: 100,
        description: '座っているプレイヤーのキーボード入力などで乗り物を操作できる座席です。\nキーボードなどで-1から1の範囲を操作できる数値信号を4個、オン/オフ信号を7個提供し、座っている人の視点方向も出力されます。[f]を押して座ったり立ったりします。\nキーの挙動などはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Compact Pilot Seat.png',
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
            { type: 'オン/オフ', name: '（ホットキー１～6）', description: 'On/Offを出力' },
            { type: '複合信号', name: '座席情報', description: '操作情報を複合データで出力\n・Number channel 1～4   Axis 1～4の数値を出力\n・Number channel 9　     Look Xの数値を出力\n・Number channel 10   　Look Yの数値を出力\n・On/Off channel 1～6	Hotkey1～6のオンオフ信号を出力\n・On/Off channel 31	Triggerのオンオフ信号を出力\n・On/Off channel 32	Occupiedのオンオフ信号を出力' },
            { type: '音声', name: 'ヘッドセット音声信号出力', description: 'ヘッドセット音声信号出力' },
          ],
        },
        settings: 'なし',
      },
      {
        name: 'Pilot Seat',
        mass: 24,
        cost: 100,
        description: '座っているプレイヤーのキーボード入力などで乗り物を操作できる座席です。\nキーボードなどで-1から1の範囲を操作できる数値信号を4個、オン/オフ信号を7個提供し、座っている人の視点方向も出力されます。[f]を押して座ったり立ったりします。\nキーの挙動などはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Pilot Seat.png',
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
            { type: 'オン/オフ', name: '（ホットキー１～6）', description: 'On/Offを出力' },
            { type: '複合信号', name: '座席情報', description: '操作情報を複合データで出力\n・Number channel 1～4   Axis 1～4の数値を出力\n・Number channel 9　     Look Xの数値を出力\n・Number channel 10   　Look Yの数値を出力\n・On/Off channel 1～6	Hotkey1～6のオンオフ信号を出力\n・On/Off channel 31	Triggerのオンオフ信号を出力\n・On/Off channel 32	Occupiedのオンオフ信号を出力' },
            { type: '音声', name: 'ヘッドセット音声信号出力', description: 'ヘッドセット音声信号出力' },
          ],
        },
        settings: 'なし',
      },
      {
        name: 'Map Icon Block',
        mass: 1,
        cost: 100,
        description: '乗り物をマップから追跡できるブロックです。\n乗り物に設置するとマップ上にアイコンが表示され、通常の乗り物アイコンは表示されなくなります。\n設定した乗り物名はマップ上でも表示されます。',
        image: '/img/Block_data/VEHICLE CONTROL/Map Icon Block.png',
        logic:'なし',
        settings: [
          { name: '表示名', description: '乗り物の名前' },
        ],
      },
      {
        name: 'Control Surface (Medium)',
        mass: 15,
        cost: 250,
        description: '乗り物に取り付けて,乗り物の動きを制御できる中型の可動翼です。\n-1から1の数値信号の入力によって翼の向きを制御できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Control Surface (Medium).png',
        logic:{
          input: [
            { type: '数値', name: '翼の向き', description: '-1~1 目標角度の設定値(0が中心で±45度)' },
          ],
        },
        settings:'なし',
      },
      {
        name: 'Control Surface (Large)',
        mass: 25,
        cost: 500,
        description: '乗り物に取り付けて,乗り物の動きを制御できる大型の可動翼です。\n-1から1の数値信号の入力によって翼の向きを制御できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Control Surface (Large).png',
        logic:{
          input: [
            { type: '数値', name: '翼の向き', description: '-1~1 目標角度の設定値(0が中心で±45度)' },
          ],
        },
        settings:'なし',
      },
      {
        name: 'Control Surface (Small)',
        mass: 10,
        cost: 150,
        description: '乗り物に取り付けて,乗り物の動きを制御できる小型の可動翼です。\n-1から1の数値信号の入力によって翼の向きを制御できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Control Surface (Small).png',
        logic:{
          input: [
            { type: '数値', name: '翼の向き', description: '-1~1 目標角度の設定値(0が中心で±45度)' },
          ],
        },
        settings:'なし',
      },
      {
        name: 'Control Fin Medium',
        mass: 5,
        cost: 150,
        description: '乗り物に取り付けて,乗り物の動きを制御できる中型の可動翼です。\n-1から1の数値信号の入力によって翼の向きを制御できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Control Fin Medium.png',
        logic:{
          input: [
            { type: '数値', name: '翼の向き', description: '-1~1 目標角度の設定値(0が中心で±15度)' },
          ],
        },
        settings:'なし',
      },
      {
        name: 'Control Fin Large',
        mass: 10,
        cost: 350,
        description: '乗り物に取り付けて,乗り物の動きを制御できる大型の可動翼です。\n-1から1の数値信号の入力によって翼の向きを制御できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Control Fin Large.png',
        logic:{
          input: [
            { type: '数値', name: '翼の向き', description: '-1~1 目標角度の設定値(0が中心で±15度)' },
          ],
        },
        settings:'なし',
      },
      {
        name: 'Control Fin Small',
        mass: 2,
        cost: 50,
        description: '乗り物に取り付けて,乗り物の動きを制御できる小型の可動翼です。\n-1から1の数値信号の入力によって翼の向きを制御できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Control Fin Small.png',
        logic:{
          input: [
            { type: '数値', name: '翼の向き', description: '-1~1 目標角度の設定値(0が中心で±15度)' },
          ],
        },
        settings:'なし',
      },
      {
        name: 'Space Seat',
        mass: 3,
        cost: 500,
        description: '座っているプレイヤーのキーボード入力などで乗り物を操作できる座席です。\nキーボードなどで-1から1の範囲を操作できる数値信号を4個、オン/オフ信号を7個提供し、座っている人の視点方向も出力されます。[f]を押して座ったり立ったりします。\nキーの挙動などはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Space Seat.png',
        logic: {
          input: [
            { type: '音声', name: 'ヘッドセット音声信号入力', description: 'ヘッドセット音声信号入力' },
            { type: '映像', name: 'ヘッドセット映像信号入力', description: 'ヘッドセット映像信号入力' },
            { type: '流体', name: '流体流入', description: '着席時宇宙服に酸素を供給' },
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
            { type: 'オン/オフ', name: '（ホットキー１～6）', description: 'On/Offを出力' },
            { type: '複合信号', name: '座席情報', description: '操作情報を複合データで出力\n・Number channel 1～4   Axis 1～4の数値を出力\n・Number channel 9　     Look Xの数値を出力\n・Number channel 10   　Look Yの数値を出力\n・On/Off channel 1～6	Hotkey1～6のオンオフ信号を出力\n・On/Off channel 31	Triggerのオンオフ信号を出力\n・On/Off channel 32	Occupiedのオンオフ信号を出力' },
            { type: '音声', name: 'ヘッドセット音声信号出力', description: 'ヘッドセット音声信号出力' },
          ],
        },
        settings: 'なし',
      },
      {
        name: 'Tank Wheel (Medium)',
        mass: 30,
        cost: 200,
        description: '履帯用の中型の車輪です。\n履帯を動かすには履帯駆動輪を組み込む必要があります。\n乗り物のスポーン時に正しい位置にある同じ大きさの車輪同士に履帯が装着されます。',
        image: '/img/Block_data/VEHICLE CONTROL/Tank Wheel (Medium).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: 'オンで車輪を固定する' },
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'トラックの張力', description: '1～100％　張り強さの設定' },
        ],
      },
      {
        name: 'Tank Wheel (Large)',
        mass: 40,
        cost: 250,
        description: '履帯用の大型の車輪です。\n履帯を動かすには履帯駆動輪を組み込む必要があります。\n乗り物のスポーン時に正しい位置にある同じ大きさの車輪同士に履帯が装着されます。',
        image: '/img/Block_data/VEHICLE CONTROL/Tank Wheel (Large).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: 'オンで車輪を固定する' },
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'トラックの張力', description: '1～100％　張り強さの設定' },
        ],
      },
      {
        name: 'Tank Wheel (Small)',
        mass: 20,
        cost: 100,
        description: '履帯用の小型の車輪です。\n履帯を動かすには履帯駆動輪を組み込む必要があります。\n乗り物のスポーン時に正しい位置にある同じ大きさの車輪同士に履帯が装着されます。',
        image: '/img/Block_data/VEHICLE CONTROL/Tank Wheel (Small).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: 'オンで車輪を固定する' },
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'トラックの張力', description: '1～100％　張り強さの設定' },
        ],
      },
      {
        name: 'Tank Wheel (Small/Wide)',
        mass: 25,
        cost: 100,
        description: '幅が広い履帯用の小型の車輪です。\n履帯を動かすには履帯駆動輪を組み込む必要があります。\n乗り物のスポーン時に正しい位置にある同じ大きさの車輪同士に履帯が装着されます。',
        image: '/img/Block_data/VEHICLE CONTROL/Tank Wheel (Small_Wide).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: 'オンで車輪を固定する' },
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'トラックの張力', description: '1～100％　張り強さの設定' },
        ],
      },
      {
        name: 'Tank Wheel (Huge)',
        mass: 80,
        cost: 350,
        description: '履帯用の特大型の車輪です。\n履帯を動かすには履帯駆動輪を組み込む必要があります。\n乗り物のスポーン時に正しい位置にある同じ大きさの車輪同士に履帯が装着されます。',
        image: '/img/Block_data/VEHICLE CONTROL/Tank Wheel (Huge).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: 'オンで車輪を固定する' },
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'トラックの張力', description: '1～100％　張り強さの設定' },
        ],
      },
      {
        name: 'Tank Drive Wheel (Medium)',
        mass: 30,
        cost: 300,
        description: '履帯用の中型の駆動輪です。\n履帯を動かすには履帯駆動輪を組み込む必要があります。\n乗り物のスポーン時に正しい位置にある同じ大きさの車輪同士に履帯が装着されます。',
        image: '/img/Block_data/VEHICLE CONTROL/Tank Drive Wheel (Medium).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: 'オンで車輪を固定する' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'トラックの張力', description: '1～100％　張り強さの設定' },
        ],
      },
      {
        name: 'Tank Drive Wheel (Large)',
        mass: 40,
        cost: 350,
        description: '履帯用の大型の駆動輪です。\n履帯を動かすには履帯駆動輪を組み込む必要があります。\n乗り物のスポーン時に正しい位置にある同じ大きさの車輪同士に履帯が装着されます。',
        image: '/img/Block_data/VEHICLE CONTROL/Tank Drive Wheel (Large).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: 'オンで車輪を固定する' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'トラックの張力', description: '1～100％　張り強さの設定' },
        ],
      },
      {
        name: 'Tank Drive Wheel (Small)',
        mass: 20,
        cost: 200,
        description: '履帯用の小型の駆動輪です。\n履帯を動かすには履帯駆動輪を組み込む必要があります。\n乗り物のスポーン時に正しい位置にある同じ大きさの車輪同士に履帯が装着されます。',
        image: '/img/Block_data/VEHICLE CONTROL/Tank Drive Wheel (Small).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: 'オンで車輪を固定する' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'トラックの張力', description: '1～100％　張り強さの設定' },
        ],
      },
      {
        name: 'Tank Drive Wheel (Small/Wide)',
        mass: 25,
        cost: 250,
        description: '幅が広い履帯用の小型の駆動輪です。\n履帯を動かすには履帯駆動輪を組み込む必要があります。\n乗り物のスポーン時に正しい位置にある同じ大きさの車輪同士に履帯が装着されます。',
        image: '/img/Block_data/VEHICLE CONTROL/Tank Drive Wheel (Small_Wide).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: 'オンで車輪を固定する' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'トラックの張力', description: '1～100％　張り強さの設定' },
        ],
      },
      {
        name: 'Tank Drive Wheel (Huge)',
        mass: 80,
        cost: 450,
        description: '履帯用の大型の駆動輪です。\n履帯を動かすには履帯駆動輪を組み込む必要があります。\n乗り物のスポーン時に正しい位置にある同じ大きさの車輪同士に履帯が装着されます。',
        image: '/img/Block_data/VEHICLE CONTROL/Tank Drive Wheel (Huge).png',
        logic: {
          input:[
            { type: 'オン/オフ', name: 'ブレーキ', description: 'オンで車輪を固定する' },
            { type: '動力', name: '動力', description: '車輪駆動用の動力' }
          ]
        },
        settings: [
          { name: 'グリップ力', description: '1～100％　車輪の滑り難さを設定' },
          { name: 'トラックの張力', description: '1～100％　張り強さの設定' },
        ],
      },
      {
        name: 'Keep Active Block',
        mass: 1,
        cost: 100,
        description: '乗り物に設置すると、その乗り物が読み込み範囲外に移動しても常に読み込まれた状態になります。\n使用し過ぎると負荷により遅延が発生する場合があります。',
        image: '/img/Block_data/VEHICLE CONTROL/Keep Active Block.png',
        logic:'なし',
        settings: 'なし',
      },
      {
        name: 'RX Directional (Large)',
        mass: 35,
        cost: 8000,
        description: '強力な電波/映像信号送受信機です。\n信号の送受信は指定された周波数で行います。\n通信相手に向いていなければ通信できません。\n初期状態では受信モードです。\n電力の低下と共に距離は小さくなります。\n(地上の有効距離:10000km)',
        image: '/img/Block_data/VEHICLE CONTROL/RX Directional (Large).png',
        logic:{
          input:[
            { type: '音声', name: '音声送信', description: '送信する音声データの入力' },
            { type: '映像', name: '映像送信', description: '送信する映像データの入力' },
            { type: '複合信号', name: 'データ送信', description: '送信する複合信号の入力' },
            { type: '数値', name: '周波数', description: '送受信する周波数の設定値' },
            { type: 'オン/オフ', name: '送信モード', description: 'on/off(送信/受信)' },
            { type: '数値', name: '目標ピッチ', description: '-1～1 アンテナの目標角度の設定値(0が中心で±45度)' },
            { type: '数値', name: '周波数', description: 'アンテナの目標角度の設定値(0が中心 単位：回転)' },
            { type: '電力', name: '	動作用電力', description: '	動作用電力' },
          ],
          output:[
            { type: '音声', name: '音声受信', description: '受信した音声データの出力' },
            { type: '映像', name: '映像受信', description: '受信した映像データの出力' },
            { type: '複合信号', name: 'データ受信', description: '受信する複合信号の出力' },
            { type: '数値', name: '信号強度', description: '受信した信号の強度' },
          ]
        }
          ,
        settings: 'なし',
      },
      {
        name: 'RX Directional',
        mass: 20,
        cost: 5000,
        description: '強力な電波/映像信号送受信機です。\n信号の送受信は指定された周波数で行います。\n通信相手に向いていなければ通信できません。\n初期状態では受信モードです。\n電力の低下と共に距離は小さくなります。\n(地上の有効距離:8000km)',
        image: '/img/Block_data/VEHICLE CONTROL/RX Directional.png',
        logic:{
          input:[
            { type: '音声', name: '音声送信', description: '送信する音声データの入力' },
            { type: '映像', name: '映像送信', description: '送信する映像データの入力' },
            { type: '複合信号', name: 'データ送信', description: '送信する複合信号の入力' },
            { type: '数値', name: '周波数', description: '送受信する周波数の設定値' },
            { type: 'オン/オフ', name: '送信モード', description: 'on/off(送信/受信)' },
            { type: '数値', name: '目標ピッチ', description: '-1～1 アンテナの目標角度の設定値(0が中心で±45度)' },
            { type: '数値', name: '周波数', description: 'アンテナの目標角度の設定値(0が中心 単位：回転)' },
            { type: '電力', name: '	動作用電力', description: '	動作用電力' },
          ],
          output:[
            { type: '音声', name: '音声受信', description: '受信した音声データの出力' },
            { type: '映像', name: '映像受信', description: '受信した映像データの出力' },
            { type: '複合信号', name: 'データ受信', description: '受信する複合信号の出力' },
            { type: '数値', name: '信号強度', description: '受信した信号の強度' },
          ]
        }
          ,
        settings: 'なし',
      },
      {
        name: 'Friction Pad',
        mass: 1,
        cost: 15,
        description: '接触面と大きな摩擦が生じるパッドです。\nどんな接触面とでも大きな摩擦が生じます。',
        image: '/img/Block_data/VEHICLE CONTROL/Friction Pad.png',
        logic:'なし',
        settings: [
          { name: 'グリップ力', description: '1～100％　摩擦の大きさを設定' },
        ],
      },
      {
        name: 'Control Handle',
        mass: 1,
        cost: 50,
        description: '座っているプレイヤーのキーボード入力などで乗り物を操作できる座席です。\nキーボードなどで-1から1の範囲を操作できる数値信号を4個、オン/オフ信号を7個提供し、座っている人の視点方向も出力されます。[f]を押して座ったり立ったりします。\nキーの挙動などはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Control Handle.png',
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
            { type: 'オン/オフ', name: '（ホットキー１～6）', description: 'On/Offを出力' },
            { type: '複合信号', name: '座席情報', description: '操作情報を複合データで出力\n・Number channel 1～4   Axis 1～4の数値を出力\n・Number channel 9　     Look Xの数値を出力\n・Number channel 10   　Look Yの数値を出力\n・On/Off channel 1～6	Hotkey1～6のオンオフ信号を出力\n・On/Off channel 31	Triggerのオンオフ信号を出力\n・On/Off channel 32	Occupiedのオンオフ信号を出力' },
            { type: '音声', name: 'ヘッドセット音声信号出力', description: 'ヘッドセット音声信号出力' },
          ],
        },
        settings: 'なし',
      },
      {
        name: 'Radio Video Recv',
        mass: 10,
        cost: 1000,
        description: '映像信号の受信を行う無線通信アンテナです。\n指定された周波数で映像信号の受信を行います。\n電力の低下と共に範囲は小さくなります。',
        image: '/img/Block_data/VEHICLE CONTROL/Radio Video Recv.png',
        logic:{
          input:[
            { type: '数値', name: '周波数', description: '送受信する周波数の設定値' },
            { type: '電力', name: '	動作用電力', description: '	動作用電力' },
          ],
          output:[
            { type: '映像', name: '映像受信', description: '受信した映像データの出力' },
            { type: '数値', name: '信号強度', description: '受信した信号の強度' },
          ]
        },
        settings: 'なし',
      },
      {
        name: 'Radio Video Xmit',
        mass: 10,
        cost: 2000,
        description: '映像信号の送信を行う無線通信アンテナです。\n指定された周波数で映像信号の送信を行います。\n電力の低下と共に範囲は小さくなります。',
        image: '/img/Block_data/VEHICLE CONTROL/Radio Video Xmit.png',
        logic:{
          input:[
            { type: '映像', name: '映像送信', description: '送信した映像データの出力' },
            { type: '数値', name: '周波数', description: '送受信する周波数の設定値' },
            { type: '電力', name: '	動作用電力', description: '	動作用電力' },
          ],
          output:[
            { type: '数値', name: '信号強度', description: '送信した信号の強度' },
          ]
        },
        settings: 'なし',
      },
      {
        name: 'Radio RX Medium',
        mass: 8,
        cost: 500,
        description: '信号の送受信を行う中型の無線通信アンテナです。\n信号の送受信は指定された周波数で行います。\n電力の低下と共に範囲は小さくなります。\n(地上の有効範囲:1km)',
        image: '/img/Block_data/VEHICLE CONTROL/Radio RX Medium.png',
        logic:{
          input:[
            { type: '映像', name: '映像送信', description: '送信する映像データの入力' },
            { type: '複合信号', name: 'データ送信', description: '送信する複合信号の入力' },
            { type: '数値', name: '周波数', description: '送受信する周波数の設定値' },
            { type: 'オン/オフ', name: '送信モード', description: 'on/off(送信/受信)' },
            { type: '電力', name: '	動作用電力', description: '	動作用電力' },
          ],
          output:[
            { type: '音声', name: '音声受信', description: '受信した音声データの出力' },
            { type: '映像', name: '映像受信', description: '受信した映像データの出力' },
            { type: '複合信号', name: 'データ受信', description: '受信する複合信号の出力' },
            { type: '数値', name: '信号強度', description: '受信した信号の強度' },
          ]
        },
        settings: 'なし',
      },
      {
        name: 'Radio RX Large',
        mass: 12,
        cost: 1000,
        description: '信号の送受信を行う中型の無線通信アンテナです。\n信号の送受信は指定された周波数で行います。\n電力の低下と共に範囲は小さくなります。\n(地上の有効範囲:4km)',
        image: '/img/Block_data/VEHICLE CONTROL/Radio RX Large.png',
        logic:{
          input:[
            { type: '映像', name: '映像送信', description: '送信する映像データの入力' },
            { type: '複合信号', name: 'データ送信', description: '送信する複合信号の入力' },
            { type: '数値', name: '周波数', description: '送受信する周波数の設定値' },
            { type: 'オン/オフ', name: '送信モード', description: 'on/off(送信/受信)' },
            { type: '電力', name: '	動作用電力', description: '	動作用電力' },
          ],
          output:[
            { type: '音声', name: '音声受信', description: '受信した音声データの出力' },
            { type: '映像', name: '映像受信', description: '受信した映像データの出力' },
            { type: '複合信号', name: 'データ受信', description: '受信する複合信号の出力' },
            { type: '数値', name: '信号強度', description: '受信した信号の強度' },
          ]
        },
        settings: 'なし',
      },
      {
        name: 'Radio RX Small',
        mass: 5,
        cost: 200,
        description: '信号の送受信を行う小型な無線通信アンテナです。\n信号の送受信は指定された周波数で行います。\n電力の低下と共に範囲は小さくなります。\n(地上の有効範囲:100m)',
        image: '/img/Block_data/VEHICLE CONTROL/Radio RX Small.png',
        logic:{
          input:[
            { type: '映像', name: '映像送信', description: '送信する映像データの入力' },
            { type: '複合信号', name: 'データ送信', description: '送信する複合信号の入力' },
            { type: '数値', name: '周波数', description: '送受信する周波数の設定値' },
            { type: 'オン/オフ', name: '送信モード', description: 'on/off(送信/受信)' },
            { type: '電力', name: '	動作用電力', description: '	動作用電力' },
          ],
          output:[
            { type: '音声', name: '音声受信', description: '受信した音声データの出力' },
            { type: '映像', name: '映像受信', description: '受信した映像データの出力' },
            { type: '複合信号', name: 'データ受信', description: '受信する複合信号の出力' },
            { type: '数値', name: '信号強度', description: '受信した信号の強度' },
          ]
        },
        settings: 'なし',
      },
      {
        name: 'Radio RX Huge',
        mass: 20,
        cost: 3000,
        description: '信号の送受信を行う特大型の無線通信アンテナです。\n信号の送受信は指定された周波数で行います。\n電力の低下と共に範囲は小さくなります。\n(地上の有効範囲:20km)',
        image: '/img/Block_data/VEHICLE CONTROL/Radio RX Huge.png',
        logic:{
          input:[
            { type: '映像', name: '映像送信', description: '送信する映像データの入力' },
            { type: '複合信号', name: 'データ送信', description: '送信する複合信号の入力' },
            { type: '数値', name: '周波数', description: '送受信する周波数の設定値' },
            { type: 'オン/オフ', name: '送信モード', description: 'on/off(送信/受信)' },
            { type: '電力', name: '	動作用電力', description: '	動作用電力' },
          ],
          output:[
            { type: '音声', name: '音声受信', description: '受信した音声データの出力' },
            { type: '映像', name: '映像受信', description: '受信した映像データの出力' },
            { type: '複合信号', name: 'データ受信', description: '受信する複合信号の出力' },
            { type: '数値', name: '信号強度', description: '受信した信号の強度' },
          ]
        },
        settings: 'なし',
      },
      {
        name: 'Wing Section (Medium)',
        mass: 15,
        cost: 300,
        description: '空気中を移動している時に揚力を発生させる中型の翼の一部です。\n翼は横方向(平面方向)へは空気抵抗を発生させますが、縦方向(曲面方向)へは揚力を発生させます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wing Section (Medium).png',
        logic:'なし',
        settings:'なし',
      },
      {
        name: 'Wing Section (Large)',
        mass: 20,
        cost: 500,
        description: '空気中を移動している時に揚力を発生させる大型の翼の一部です。\n翼は横方向(平面方向)へは空気抵抗を発生させますが、縦方向(曲面方向)へは揚力を発生させます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wing Section (Large).png',
        logic:'なし',
        settings:'なし',
      },
      {
        name: 'Wing Section (Small)',
        mass: 8,
        cost: 150,
        description: '空気中を移動している時に揚力を発生させる小型の翼の一部です。\n翼は横方向(平面方向)へは空気抵抗を発生させますが、縦方向(曲面方向)へは揚力を発生させます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wing Section (Small).png',
        logic:'なし',
        settings:'なし',
      },
      {
        name: 'Wing Section (XLarge)',
        mass: 30,
        cost: 800,
        description: '空気中を移動している時に揚力を発生させる特大型の翼の一部です。\n翼は横方向(平面方向)へは空気抵抗を発生させますが、縦方向(曲面方向)へは揚力を発生させます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wing Section (XLarge).png',
        logic:'なし',
        settings:'なし',
      },
      {
        name: 'Wing Section (XXLarge)',
        mass: 50,
        cost: 1500,
        description: '空気中を移動している時に揚力を発生させる超特大型の翼の一部です。\n翼は横方向(平面方向)へは空気抵抗を発生させますが、縦方向(曲面方向)へは揚力を発生させます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wing Section (XXLarge).png',
        logic:'なし',
        settings:'なし',
      },
      {
        name: 'Wing Front Section (Small)',
        mass: 5,
        cost: 100,
        description: '空気中を移動している時に揚力を発生させる小型の翼の前方部です。\n翼は横方向(平面方向)へは空気抵抗を発生させますが、縦方向(曲面方向)へは揚力を発生させます。',
        image: '/img/Block_data/VEHICLE CONTROL/Wing Front Section (Small).png',
        logic:'なし',
        settings:'なし',
      },
      {
        name: 'Fin Rudder',
        mass: 5,
        cost: 100,
        description: '船の背後に取り付けて船のヨーを制御し、船の舵取りを可能にします。\n向きの制御は-1から1の範囲の数値信号で行います。',
        image: '/img/Block_data/VEHICLE CONTROL/Fin Rudder.png',
        logic:{
          input:[
            { type: '数値', name: '舵角度', description: '-1~1 目標角度の設定値(0が中心で±45度)' },
            { type: '電力', name: '動作用電力', description: '動作用電力' },
          ]
          },
        settings:'なし',
      },
      {
        name: 'Rudder',
        mass: 10,
        cost: 150,
        description: '船の背後に取り付けて船のヨーを制御し、船の舵取りを可能にします。\n向きの制御は-1から1の範囲の数値信号で行います。',
        image: '/img/Block_data/VEHICLE CONTROL/Rudder.png',
        logic:{
          input:[
            { type: '数値', name: '舵角度', description: '-1~1 目標角度の設定値(0が中心で±45度)' },
            { type: '電力', name: '動作用電力', description: '動作用電力' },
          ]
          },
        settings:'なし',
      },
      {
        name: 'Helm',
        mass: 15,
        cost: 150,
        description: '使用しているプレイヤーのキーボード入力などで乗り物を操作できる舵輪です。\nキーボードなどで-1から1の範囲を操作できる数値信号を4個、オン/オフ信号を7個提供し、座っている人の視点方向も出力されます。[f]を押して座ったり立ったりします。\nキーの挙動などはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Helm.png',
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
            { type: 'オン/オフ', name: '（ホットキー１～6）', description: 'On/Offを出力' },
            { type: '複合信号', name: '座席情報', description: '操作情報を複合データで出力\n・Number channel 1～4   Axis 1～4の数値を出力\n・Number channel 9　     Look Xの数値を出力\n・Number channel 10   　Look Yの数値を出力\n・On/Off channel 1～6	Hotkey1～6のオンオフ信号を出力\n・On/Off channel 31	Triggerのオンオフ信号を出力\n・On/Off channel 32	Occupiedのオンオフ信号を出力' },
            { type: '音声', name: 'ヘッドセット音声信号出力', description: 'ヘッドセット音声信号出力' },
          ],
        },
        settings: 'なし',
      },
      {
        name: 'Driver Seat',
        mass: 10,
        cost: 100,
        description: '座っているプレイヤーのキーボード入力などで乗り物を操作できる座席です。\nキーボードなどで-1から1の範囲を操作できる数値信号を4個、オン/オフ信号を7個提供し、座っている人の視点方向も出力されます。[f]を押して座ったり立ったりします。\nキーの挙動などはプロパティウィンドウから設定できます。',
        image: '/img/Block_data/VEHICLE CONTROL/Driver Seat.png',
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
            { type: 'オン/オフ', name: '（ホットキー１～6）', description: 'On/Offを出力' },
            { type: '複合信号', name: '座席情報', description: '操作情報を複合データで出力\n・Number channel 1～4   Axis 1～4の数値を出力\n・Number channel 9　     Look Xの数値を出力\n・Number channel 10   　Look Yの数値を出力\n・On/Off channel 1～6	Hotkey1～6のオンオフ信号を出力\n・On/Off channel 31	Triggerのオンオフ信号を出力\n・On/Off channel 32	Occupiedのオンオフ信号を出力' },
            { type: '音声', name: 'ヘッドセット音声信号出力', description: 'ヘッドセット音声信号出力' },
          ],
        },
        settings: 'なし',
      },
    ],
  },
];