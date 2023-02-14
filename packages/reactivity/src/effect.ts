export function effect(fn, options) {
  const _effect = new ReactiveEffect(fn, options);
  _effect.run()
}