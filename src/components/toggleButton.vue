<template>
  <div class="toggle" :class="[this.state_class]" @click.self="onClick">
    <div class="draggable" @mousedown.prevent="dragStart" :style="style"></div>
  </div>
</template>
<script>
export default {
  name: "toggle",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      width: 100,
      state: false,
      pressed: 0,
      position: 0
    };
  },
  mounted() {
    this.toggle(this.value);
  },
  computed: {
    style() {
      return {
        transform: `translateX(${this.pos_percentage})`
      };
    },
    pos_percentage() {
      return `${(this.position / this.width) * 100}%`;
    },
    state_class() {
      if (this.state) {
        return "active";
      }
    }
  },
  watch: {
    position() {
      this.state = this.position >= 50;
    }
  },
  methods: {
    onClick() {
      this.toggle(!this.state);
      this.emit();
    },
    toggle(state) {
      this.state = state;
      this.position = !state ? 0 : 100;
    },
    dragging(e) {
      const pos = e.clientX - this.$el.offsetLeft;
      const percent = (pos / this.width) * 100;
      this.position = percent <= 0 ? 0 : percent >= 100 ? 100 : percent;
    },
    dragStart(e) {
      this.startTimer();
      window.addEventListener("mousemove", this.dragging);
      window.addEventListener("mouseup", this.dragStop);
    },
    dragStop() {
      window.removeEventListener("mousemove", this.dragging);
      window.removeEventListener("mouseup", this.dragStop);
      this.resolvePosition();
      clearInterval(this.$options.interval);
      if (this.pressed < 30) {
        this.toggle(!this.state);
      }
      this.pressed = 0;
      this.emit();
    },
    startTimer() {
      this.$options.interval = setInterval(() => {
        this.pressed++;
      }, 1);
    },
    resolvePosition() {
      this.position = this.state ? 100 : 0;
    },
    emit() {
      this.$emit("input", this.state);
    }
  }
};
</script>
<style>
.toggle {
  width: $width;
  height: $button-size;
  background: $background;
  border: 2px solid $border-color;
  border-radius: 200px;
  padding: 2px;
  transition: background 0.6s;

  .draggable {
    width: $button-size;
    height: $button-size;
    background: $button-color;
    border-radius: 100%;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.6);
    transform: translateX(0%);
    transition: transform 0.05s ease-in-out;
  }

  &.active {
    background: $background-active;
    transition: background 0.6s;
  }
}
</style>
