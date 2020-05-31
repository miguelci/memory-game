import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Card from '@/components/Card.vue'


describe('Card Component', () => {
    const wrapper = shallowMount(Card, {
        propsData: { number: 10, disable: false}
    });

    test('it can output a card with the correct number', () => {
        expect(wrapper.find('.card-face-front').text()).toBe("10")
    })

    test('card starts has flipped by default', () => {
        expect(wrapper.find('.card').classes()).toEqual(['card', 'flipped'])
    })

    test('after click, clicked event is emited', async () => {
        wrapper.find('.card').trigger('click')
        await Vue.nextTick()
        expect(wrapper.emitted().clicked.length).toBe(1)
        expect(wrapper.emitted().clicked[0]).toEqual([])
    })

    test('after click event is emmited, and card is changed on parent, card is not flipped anymore', async () => {
        expect(wrapper.props('flipped')).toBe(true)
        wrapper.setProps({'flipped': false})
        await Vue.nextTick()
        expect(wrapper.find('.card').classes()).toEqual(['card'])
    })

    test('border changes when finish', async() => {
        expect(wrapper.props('finish')).toBe(false)
        expect(wrapper.find('.card-face-front').classes()).toEqual(['card-face', 'card-face-front'])
        wrapper.setProps({'finish': true})
        await Vue.nextTick()        
        expect(wrapper.find('.card-face-front').classes()).toEqual(['card-face', 'card-face-front', 'won'])
    })
})

