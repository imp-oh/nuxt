




export const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => props ? h(component, props, slots) : slots.default?.() };
};

/**
 * 字符串转对象
 * @param {*} state 
 * @returns 
 */
export function deserializeState (state) {
  try {
    return JSON.parse(state || '{}')
  } catch (error) {
    console.error('[SSR] On state deserialization -', error, state)
    return {}
  }
}