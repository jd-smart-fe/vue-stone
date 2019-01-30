<template>

  <div class="c-mode-container">
    <div v-if="single" :class="['c-mode', `c-mode-${position}-${numberal}`]" >
      <div
        v-for="(item) in defaultItems"
        :key="item.id"
        :class="['c-mode-item', {
          'c-mode-item-active': value == item.id,
        },{'c-mode-item-disabled': item.disabled}]"
        @click="handle(item)">
        <span :class="['c-mode-item-icon', item.icon]" v-if="item.icon && (position === 'top' || position === 'left') "></span>
        <span class="c-mode-item-text">{{item.text}}</span>
        <span :class="['c-mode-item-icon', item.icon]" v-if="item.icon && (position === 'right' || position === 'bottom')  "></span>
      </div>
    </div>
    <div v-else  :class="['c-mode', `c-mode-${position}-${numberal}`]" >
      <div
        v-for="(item) in defaultItems"
        :key="item.id"
        :class="['c-mode-item', {
          'c-mode-item-active': item.active,
        },{'c-mode-item-disabled': item.disabled}]"
        @click="handle(item)">
        <span :class="['c-mode-item-icon', item.icon]" v-if="item.icon && (position === 'top' || position === 'left') "></span>
        <span class="c-mode-item-text">{{item.text}}</span>
        <span :class="['c-mode-item-icon', item.icon]" v-if="item.icon && (position === 'right' || position === 'bottom')  "></span>
      </div>
    </div>

    <template v-if="!!extraItems.length">
      <transition name="fade">
        <div v-show="extraShow"
          :class="['c-mode', 'c-mode-more', `c-mode-${position}-${numberal}` ]" >
          <div
            v-for="(item) in extraItems"
            :key="item.id"
            :class="['c-mode-item', {
              'c-mode-item-active': value == item.id,
            },{'c-mode-item-disabled': item.disabled}]"
            @click="handle(item)">
            <span :class="['c-mode-item-icon', item.icon]" v-if="item.icon && (position === 'top' || position === 'left') "></span>
            <span class="c-mode-item-text">{{item.text}}</span>
            <span :class="['c-mode-item-icon', item.icon]" v-if="item.icon && (position === 'right' || position === 'bottom')  "></span>
          </div>
        </div>
      </transition>
    </template>

    <div v-if="more && (total > numberal)"
      class="c-mode-more-hook u-cross-center"
      @click="extraShow = !extraShow" >
      {{more}}
      <span :class="['c-mode-toggle', 'v-icon-pull-down', {
        'v-icon-pull-down-rotate': extraShow,
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
      type: {
        type: String,
        required: false,
        default: 'Single',
      },
      items: {
        type: Array,
        required: true,
      },
      numberal: {
        type: Number,
        default: 4,     // 2, 3
      },
      iconPosition: {
        type: String,
        default: 'left',     // 2, 3
      },
      more: {
        type: String,
        default: '',
      },
    },

    data() {
      return {
        extraShow: false,
        actionItems: false,
      };
    },
    created() {
      console.log(this.type);
    },
    computed: {
      single() {
        return this.type === 'Single';
      },
      total() {
        return this.items.length;
      },
      defaultItems() {
        return this.items.slice(0, this.numberal);
      },
      extraItems() {
        return this.items.slice(this.numberal);
      },
      position() {
        let str = 'left';
        if (this.iconPosition !== 'top' && this.iconPosition !== 'left' && this.iconPosition !== 'right' && this.iconPosition !== 'bottom') {
          str = 'left';
        } else {
          str = this.iconPosition;
        }
        return str;
      },
    },
    methods: {
      handle(item) {
        if (item.disabled) {
          return false;
        }
        const val = item.id;
        item.active = !item.active;
        this.$emit('input', val);
        this.$emit('change', val, item);
        return true;
      },
    },
  };
</script>

<style lang="postcss">

  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

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

    /* @mixin transition background-color; */

    border-left: 1px solid $gray-lightest;
    border-bottom: 1px solid $gray-lightest;
  }

  .c-mode-item-icon {
    font-size: $font-size-xl;
  }

  .c-mode-top-4 {
    .c-mode-item {
      flex-direction: column;
      width: calc(100% / 4);
      height: calc($grid-size * 3);
    }
    .c-mode-item-icon {
      margin-bottom: 0.15rem;
    }
    .c-mode-item:nth-child(4n + 1) {
      border-left-width: 0;
    }
    .c-mode-item:last-child {
      border-right: 1px solid $gray-lightest;
    }
  }

  @for $i from 2 to 3 {
    .c-mode-top-$i {
      .c-mode-item {
        flex-direction: column;
        width: calc(100% / $i);
        height: calc($grid-size * 3);
        &:nth-child($(i)n+1) {
          border-left-width: 0;
        }
      }
      .c-mode-item-icon {
        margin-bottom: 0.15rem;
      }
      .c-mode-item:last-child {
      border-right: 1px solid $gray-lightest;
      }
    }
  }

  .c-mode-right-4 {
    .c-mode-item {
      width: calc(100% / 4);
      height: calc($grid-size * 2);
    }
    .c-mode-item-icon {
      margin-bottom: 0.02rem;
      margin-left: 0.02rem;
    }
    .c-mode-item:nth-child(4n + 1) {
      border-left-width: 0;
    }
    .c-mode-item:last-child {
      border-right: 1px solid $gray-lightest;
    }
  }

  @for $i from 2 to 3 {
    .c-mode-right-$i {
      .c-mode-item {
        width: calc(100% / $i);
        height: calc($grid-size * 2);
        &:nth-child($(i)n+1) {
          border-left-width: 0;
        }
      }
      .c-mode-item-icon {
         margin-bottom: 0.02rem;
         margin-left: 0.05rem;
      }
      .c-mode-item:last-child {
        border-right: 1px solid $gray-lightest;
      }
    }
  }

   .c-mode-bottom-4 {
    .c-mode-item {
      flex-direction: column;
      width: calc(100% / 4);
      height: calc($grid-size * 3);
    }
    .c-mode-item-icon {
      margin-top: 0.15rem;
    }
    .c-mode-item:nth-child(4n + 1) {
      border-left-width: 0;
    }
    .c-mode-item:last-child {
        border-right: 1px solid $gray-lightest;
    }
  }


   @for $i from 2 to 3 {
    .c-mode-bottom-$i {
      .c-mode-item {
        flex-direction: column;
        width: calc(100% / $i);
        height: calc($grid-size * 3);
        &:nth-child($(i)n+1) {
          border-left-width: 0;
        }
      }
      .c-mode-item-icon {
        margin-top: 0.15rem;
      }
      .c-mode-item:last-child {
        border-right: 1px solid $gray-lightest;
      }
    }

  }


  .c-mode-left-4 {
    .c-mode-item {
      width: calc(100% / 4);
      height: calc($grid-size * 2);
    }
    .c-mode-item-icon {
      margin-right: 0.05rem;
      margin-bottom: 0.03rem;
    }
    .c-mode-item:nth-child(4n + 1) {
      border-left-width: 0;
    }
    .c-mode-item:last-child {
        border-right: 1px solid $gray-lightest;
    }
  }


   @for $i from 2 to 3 {
    .c-mode-left-$i {
      .c-mode-item {
        width: calc(100% / $i);
        height: calc($grid-size * 2);
        &:nth-child($(i)n+1) {
          border-left-width: 0;
        }
      }
      .c-mode-item-icon {
        margin-right: 0.05rem;
        margin-bottom: 0.03rem;
      }
      .c-mode-item:last-child {
        border-right: 1px solid $gray-lightest;
      }
    }
  }

  .c-mode-item-active {
    background: $c-primary;
    color: #fff;
  }
  .c-mode-item-disabled{
    color: $gray-light;
    cursor: not-allowed;
    background-color: rgba(238, 238, 238, .4);
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

  .v-icon-pull-down {
    @mixin transition transform;
    transform: rotate(0);
  }
  .v-icon-pull-down-rotate {
    transform: rotate(-180deg);
  }
</style>
