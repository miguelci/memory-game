import { shallowMount } from '@vue/test-utils'
import CardList from '@/components/CardList.vue'
import Card from '@/components/Card.vue'

describe('Card List Component', () => {

    const cardList = [
        {number: 10, flipped: true, disabled: true, finish: false},
        {number: 2, flipped: true, disabled: true, finish: false},
        {number: 6, flipped: true, disabled: true, finish: false},
        {number: 3, flipped: true, disabled: true, finish: false},
    ]

    const wrapper = shallowMount(CardList, {
        propsData: { 
            currentList: cardList
        }
    })

    test('it can create a list of cards', () => {
        const children = wrapper.findAllComponents(Card)
        expect(children.length).toEqual(cardList.length)
    })
})