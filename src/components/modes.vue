<template>

  <div class="c-mode-container">

    <div :class="['c-mode', `c-mode-${numberal}`]" >

      <div v-for="(item, index) in defaultItems"
        :class="['c-mode-item', {
          'c-mode-item-active': value == item.id,
        }]"
        @click="handle(item)">
        <span :class="['c-mode-item-icon', `icon-${item.icon}`]" v-if="item.icon"></span>
        <span class="c-mode-item-text">{{item.text}}</span>
      </div>
    </div>

    <template v-if="!!extraItems.length">
      <transition name="fade">
        <div v-show="extraShow"
          :class="['c-mode', 'c-mode-more', `c-mode-${numberal}`]" >
          <div v-for="(item, index) in extraItems"
            :class="['c-mode-item', {
              'c-mode-item-active': value == item.id,
            }]"
            @click="handle(item)">
            <span v-if="item.icon"
              :class="['c-mode-item-icon', `icon-${item.icon}`]"></span>
            <span class="c-mode-item-text">{{item.text}}</span>
          </div>
        </div>
      </transition>
    </template>

    <div v-if="more && (total > numberal)"
      class="c-mode-more-hook u-cross-center"
      @click="extraShow = !extraShow" >
      {{more}}
      <span :class="['c-mode-toggle', 'icon-pull-down', {
        'icon-pull-down-rotate': extraShow,
        }]"></span>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'v-modes',
    props: {

      value: {
        type: Number,
        required: false,
        default: -1,
      },
      items: {
        type: Array,
        required: true,
      },
      numberal: {
        type: Number,
        default: 4,     // 2, 3
      },
      more: {
        type: String,
        default: '',
      },
    },

    data() {
      return {
        extraShow: false,
      };
    },

    computed: {
      total() {
        return this.items.length;
      },
      defaultItems() {
        return this.items.slice(0, this.numberal);
      },
      extraItems() {
        return this.items.slice(this.numberal);
      },
    },

    methods: {

      handle(item) {
        const val = item.id;

        this.$emit('input', val);
        this.$emit('change', val);
      },
    },
  };
</script>

<style>

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  .fade-enter-active, .fade-leave-active  {
    transition: opacity .3s ease;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  $prefix: .c-mode;

  $prefix {
    display: flex;
    flex-wrap: wrap;
  }

  
  .c-mode-item {
    box-sizing: border-box;
    font-size: $font-size-sm;

    display: flex;
    align-items: center;
    justify-content: center;

    @mixin transition background-color;

    border-left: 1px solid $gray-lightest;
    border-bottom: 1px solid $gray-lightest;
  }

  .c-mode-item-icon {
    font-size: $font-size-xl;
  }

  .c-mode-4 {
    .c-mode-item {
      flex-direction: column;
      width: calc(100% / 4);
      height: calc($grid-size * 3);
    }
    .c-mode-item-icon {
      margin-bottom: 0.1rem;
    }
    .c-mode-item:nth-child(4n + 1) {
      border-left-width: 0;
    }
  }

  @for $i from 2 to 3 {
    .c-mode-$i {
      .c-mode-item {
        width: calc(100% / $i);
        height: calc($grid-size * 2);
        &:nth-child($(i)n+1) {
          border-left-width: 0;
        }
      }
      .c-mode-item-icon {
        margin-right: 0.05rem;
      }
    }
  }

  .c-mode-item-active {
    background: $c-primary;
    color: #fff;
  }

  /* Toggle */
  .c-mode-more-hook {
    height: calc($grid-size * 2);
    justify-content: center;
  }
  
  .c-mode-toggle {
    margin-left: 0.05rem;
    font-size: $font-size-xl;
  }

  .icon-pull-down {
    @mixin transition transform;
    transform: rotate(0);
  }
  .icon-pull-down-rotate {
    transform: rotate(-180deg);
  }
</style>
