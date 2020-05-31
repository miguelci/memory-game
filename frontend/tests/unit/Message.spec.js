import { shallowMount } from '@vue/test-utils'
import Message from '@/components/Message.vue'

describe('Message Component', () => {
  it('renders props.text when passed', () => {
    const text = 'Event text'
    const wrapper = shallowMount(Message, {
      propsData: { text }
    })
    expect(wrapper.text()).toMatch(text)
  })
})
