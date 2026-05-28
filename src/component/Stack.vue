<template>
  <div
    ref="wrapperRef"
    class="relative"
    :style="{ width: cardDimensions.width + 'px', height: cardDimensions.height + 'px' }"
  >
    <Teleport to="body">
      <div
        v-if="showCursor"
        class="pointer-events-none fixed z-50"
        :style="{ left: cursorX + 'px', top: cursorY + 'px', transform: 'translate(16px, -50%)' }"
      >
        <div style="background: white; padding: 6px 12px; font-size: 11px; font-family: serif; letter-spacing: 0.03em; color: #111; white-space: nowrap;">
          [view other design works]
        </div>
      </div>
    </Teleport>

    <template v-for="(card, index) in cards" :key="card.id">
      <Motion
        as="div"
        class="absolute cursor-grab"
        :style="{
          x: cardStates.get(card.id)?.x,
          y: cardStates.get(card.id)?.y,
        }"
        drag
        :drag-constraints="{ top: 0, right: 0, bottom: 0, left: 0 }"
        :dragElastic="0.6"
        :whileTap="{ cursor: 'grabbing', scale: 1.02 }"
        :onDragEnd="(e, info) => handleDragEnd(e, info, card.id)"
      >
        <Motion
          as="div"
          class="rounded-2xl overflow-hidden border-4 border-white"
          @click="sendToBackOnClick && sendToBack(card.id)"
          :animate="{
            rotateZ: (cards.length - index - 1) * 4 + (randomRotation ? randomOffsets[card.id] ?? 0 : 0),
            scale: 1 + index * 0.06 - cards.length * 0.06,
            transformOrigin: '90% 90%'
          }"
          :initial="false"
          :transition="{
            type: 'spring',
            stiffness: animationConfig.stiffness,
            damping: animationConfig.damping
          }"
          :style="{
            width: cardDimensions.width + 'px',
            height: cardDimensions.height + 'px'
          }"
        >
          <img :src="card.img" :alt="`card-${card.id}`" class="w-full h-full object-cover pointer-events-none" />
        </Motion>
      </Motion>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PanInfo } from 'motion-v';
import { Motion, useMotionValue } from 'motion-v';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';

interface StackProps {
  className?: string;
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  cardsData: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
}

const props = withDefaults(defineProps<StackProps>(), {
  randomRotation: false,
  sensitivity: 200,
  cardDimensions: () => ({ width: 208, height: 208 }),
  cardsData: () => [],
  animationConfig: () => ({ stiffness: 260, damping: 20 }),
  sendToBackOnClick: false
});

const cards = ref(
  props.cardsData.length
    ? props.cardsData
    : [
        { id: 1, img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format' },
        { id: 2, img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format' },
        { id: 3, img: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format' },
        { id: 4, img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format' }
      ]
);

// Pre-computed random offsets per card id — never recalculated
const randomOffsets: Record<number, number> = {};

const wrapperRef = ref<HTMLElement | null>(null);
const showCursor = ref(false);
const cursorX = ref(0);
const cursorY = ref(0);

function onGlobalMouseMove(e: MouseEvent) {
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;

  if (wrapperRef.value) {
    const rect = wrapperRef.value.getBoundingClientRect();
    showCursor.value =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onGlobalMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onGlobalMouseMove);
});

type CardState = {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  reset: () => void;
};

const cardStates = new Map<number, CardState>();

function createCardState(): CardState {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  return {
    x,
    y,
    reset() {
      x.set(0);
      y.set(0);
    }
  };
}

onBeforeMount(() => {
  cards.value.forEach(card => {
    if (!cardStates.has(card.id)) {
      cardStates.set(card.id, createCardState());
    }
    // Compute random offset once per card
    if (!(card.id in randomOffsets)) {
      randomOffsets[card.id] = Math.random() * 10 - 5;
    }
  });
});

function getCardState(cardId: number): CardState {
  let state = cardStates.get(cardId);
  if (!state) {
    state = createCardState();
    cardStates.set(cardId, state);
  }
  return state;
}

function handleDragEnd(_: PointerEvent, info: PanInfo, cardId: number) {
  if (Math.abs(info.offset.x) > props.sensitivity || Math.abs(info.offset.y) > props.sensitivity) {
    sendToBack(cardId);
  } else {
    getCardState(cardId).reset();
  }
}

const sendToBack = (id: number) => {
  const newCards = [...cards.value];
  const index = newCards.findIndex(card => card.id === id);
  const [card] = newCards.splice(index, 1);
  if (card) {
    newCards.unshift(card);
    cards.value = newCards;
  }
};
</script>