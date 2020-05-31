import { shallowMount } from '@vue/test-utils'
import Select from '@/components/Select.vue'

describe('Select Component', () => {

  const wrapper = shallowMount(Select, {
    propsData: {options: [1,2,3,4]}
  });

  test('it can generate correct number of options', () => {
    expect(wrapper.findAll('option').length).toBe(5)
  })

  test('first option is disabled and next have the correct value', () => {
    const options = wrapper.findAll('option')
    expect(options.at(0).element.value).toBe('')
    expect(options.at(1).element.value).toBe('1')
    expect(options.at(2).element.value).toBe('2')
    expect(options.at(3).element.value).toBe('3')
    expect(options.at(4).element.value).toBe('4')
  })

  test('select an option will emit an event', () => {
    const options =  wrapper.find('select').findAll('option')
    options.at(1).setSelected()
    expect(wrapper.emitted().select.length).toBe(1)
    expect(wrapper.emitted().select[0]).toEqual([1])

  })
})
