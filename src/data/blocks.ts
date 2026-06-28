export type BlockData = {
  name: string;
  mass: number;
  cost: number;
  description: string;
  image: string;
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
        description: '立方体型の基本的なブロックです。このブロックの大きさは25cmです。6面すべてに部品を取り付けることができます',
        image: '/img/Block_data/BLOCKS/Block.png',
      },
      {
        name: 'Pyramid 1x2',
        mass: 0.5,
        cost: 2,
        description: '1x2の三角錐型の基本的なブロックです。斜面を除くすべての面に部品を取り付けることができます。三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 1x2.png',
      },
      {
        name: 'Pyramid 1x4',
        mass: 1,
        cost: 4,
        description: '1x4の三角錐型の基本的なブロックです。斜面を除くすべての面に部品を取り付けることができます。三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 1x4.png',
      },
      {
        name: 'Pyramid 2x2',
        mass: 1,
        cost: 4,
        description: '2x2の三角錐型の基本的なブロックです。斜面を除くすべての面に部品を取り付けることができます。三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 2x2.png',
      },
      {
        name: 'Pyramid 2x4',
        mass: 2,
        cost: 8,
        description: '2x4の三角錐型の基本的なブロックです。斜面を除くすべての面に部品を取り付けることができます。三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 2x4.png',
      },
      {
        name: 'Pyramid 4x4',
        mass: 4,
        cost: 16,
        description: '4x4の三角錐型の基本的なブロックです。斜面を除くすべての面に部品を取り付けることができます。三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid 4x4.png',
      },
      {
        name: 'Pyramid',
        mass: 0.25,
        cost: 1,
        description: '三角錐型の基本的なブロックです。斜面を除くすべての面に部品を取り付けることができます。三角ブロックは斜めブロックの接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Pyramid.png',
      },
      {
        name: 'Handle',
        mass: 1,
        cost: 5,
        description: '[q]や[e]を押してつかめる取っ手です。取っ手をつかんでいる時に[q]や[e]を押すと離せます。軽い乗り物は取っ手をつかんでそのまま動かせます。プレイヤーがとっての範囲外に移動したとき自動的に手を放します。',
        image: '/img/Block_data/BLOCKS/Handle.png',
      },
      {
        name: 'Wedge 1x2',
        mass: 1,
        cost: 2,
        description: '1x2の大きさの三角柱型のブロックです。斜面を除くすべての面に部品を取り付けることができます。',
        image: '/img/Block_data/BLOCKS/Wedge 1x2.png',
      },
      {
        name: 'Wedge 1x4',
        mass: 1,
        cost: 4,
        description: '1x4の大きさの三角柱型のブロックです。斜面を除くすべての面に部品を取り付けることができます。',
        image: '/img/Block_data/BLOCKS/Wedge 1x4.png',
      },
      {
        name: 'Wedge',
        mass: 0.5,
        cost: 2,
        description: '三角柱型の基本的なブロックです。斜面を除くすべての面に部品を取り付けることができます。',
        image: '/img/Block_data/BLOCKS/Wedge.png',
      },
      {
        name: 'Ladder',
        mass: 5,
        cost: 3,
        description: '一段のはしごです。梯子を複数個重ねて設置することで、任意の長さのはしごになります。[f]を押して梯子の登り下りをし、[f]や[space]を押すことで梯子から離れます。頂上に達すると自動で梯子から離れます。',
        image: '/img/Block_data/BLOCKS/Ladder.png',
      },
      {
        name: 'Physics Flooder',
        mass: 1,
        cost: 20,
        description: '処理の最適化のために、密閉空間が質量がないブロックで埋め尽くされていると見なすように印を付けるブロックです。密閉された空間が質量がないブロックで埋め尽くされているとシステムが見なすことで乗り物の機能を失うことなく処理の軽量化ができます。',
        image: '/img/Block_data/BLOCKS/Physics Flooder.png',
      },
      {
        name: 'Inverse Pyramid 1x2',
        mass: 1.5,
        cost: 2,
        description: '1×2の直方体から三角錐を切り取った形の基本的なブロックです。斜面を除く全ての面に部品を取付けられます。逆三角ブロックは斜めブロックや三角ブロックの隙間を埋めるのに便利です。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 1x2.png',
      },
      {
        name: 'Inverse Pyramid 1x4',
        mass: 3,
        cost: 4,
        description: '1×4の直方体から三角錐を切り取った形の基本的なブロックです。斜面を除く全ての面に部品を取付けられます。逆三角ブロックは斜めブロックや三角ブロックの隙間を埋めるのに便利です。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 1x4.png',
      },
      {
        name: 'Inverse Pyramid 2x2',
        mass: 3,
        cost: 4,
        description: '2×2の直方体から三角錐を切り取った形の基本的なブロックです。斜面を除く全ての面に部品を取付けられます。三角ブロックは斜めブロックの角の接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 2x2.png',
      },
      {
        name: 'Inverse Pyramid 2x4',
        mass: 6,
        cost: 8,
        description: '2×4の直方体から三角錐を切り取った形の基本的なブロックです。斜面を除く全ての面に部品を取付けられます。三角ブロックは斜めブロックの角の接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 2x4.png',
      },
      {
        name: 'Inverse Pyramid 4x4',
        mass: 12,
        cost: 16,
        description: '4×4の直方体から三角錐を切り取った形の基本的なブロックです。斜面を除く全ての面に部品を取付けられます。三角ブロックは斜めブロックの角の接続に使用できます。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid 4x4.png',
      },
      {
        name: 'Inverse Pyramid',
        mass: 0.75,
        cost: 2,
        description: '立方体から三角錐を切り取った形の基本的なブロックです。斜面を除く全ての面に部品を取付けられます。逆三角ブロックは斜めブロックや三角ブロックの隙間を埋めるのに便利です。',
        image: '/img/Block_data/BLOCKS/Inverse Pyramid.png',
      },
      {
        name: 'Pipe T-Piece',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプのT字部分です。',
        image: '/img/Block_data/BLOCKS/Pipe T-Piece.png',
      },
      {
        name: 'Pipe T-Piece (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプのT字部分です。ブロックの形をしており、壁や床などに埋め込めます.',
        image: '/img/Block_data/BLOCKS/Pipe T-Piece (Enclosed).png',
      },
      {
        name: 'Pipe Omni',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの全方向分岐部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Omni.png',
      },
      {
        name: 'Pipe Omni (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの全方向分岐部分です。ブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Omni (Enclosed).png',
      },
      {
        name: 'Pipe Cross',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの十字部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Cross.png',
      },
      {
        name: 'Pipe Cross (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの十字部分です。ブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Cross (Enclosed).png',
      },
      {
        name: 'Pipe Straight',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの直線部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Straight.png',
      },
      {
        name: 'Pipe Straight (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの直線部分です。ブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Straight (Enclosed).png',
      },
      {
        name: 'Pipe Angle',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Angle.png',
      },
      {
        name: 'Pipe Angle (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角部分です。ブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Angle (Enclosed).png',
      },
      {
        name: 'Pipe T-Piece Corner',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角T字部分です。',
        image: '/img/Block_data/BLOCKS/Pipe T-Piece Corner.png',
      },
      {
        name: 'Pipe T-Piece Corner (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角T字部分です。ブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe T-Piece Corner (Enclosed).png',
      },
      {
        name: 'Pipe Angle Corner',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角分岐部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Angle Corner.png',
      },
      {
        name: 'Pipe Angle Corner (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角分岐部分です。ブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Angle Corner (Enclosed).png',
      },
      {
        name: 'Pipe Cross Corner',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角十字部分です。',
        image: '/img/Block_data/BLOCKS/Pipe Cross Corner.png',
      },
      {
        name: 'Pipe Cross Corner (Enclosed)',
        mass: 1,
        cost: 5,
        description: '動力や流体を輸送するパイプの角十字部分です。ブロックの形をしており、壁や床などに埋め込めます。',
        image: '/img/Block_data/BLOCKS/Pipe Cross Corner (Enclosed).png',
      },
      {
        name: 'Weight Block',
        mass: 10,
        cost: 5,
        description: '普通のブロックよりも重いブロックです。重りブロックを使えば簡単に重心を調整できるので、バランス調整や安定性のために役立ちます。',
        image: '/img/Block_data/BLOCKS/Weight Block.png',
      },
      {
        name: 'Stair Top',
        mass: 6,
        cost: 20,
        description: '平らな床と接合する階段の上端部分です。',
        image: '/img/Block_data/BLOCKS/Stair Top.png',
      },
      {
        name: 'Stair Step',
        mass: 6,
        cost: 20,
        description: '重ねて設置すると階段を作成できる階段の一部分です。',
        image: '/img/Block_data/BLOCKS/Stair Step.png',
      },
      

    ],
  },
  {
    name: 'Vehicle Control',
    description: 'ゲームの基本的な構造ブロックの一覧です',
    blocks: [
      {
        name: '10x1 Block',
        mass: 1,
        cost: 1,
        description: '基本的な構造ブロック。',
        image: '/img/blocks/20260620180158_1.jpg',
      },
    ],
  },
];