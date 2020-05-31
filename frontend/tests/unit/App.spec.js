import Vue from 'vue'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import CardList from '@/components/CardList.vue'
import Card from '@/components/Card.vue'

describe('App Component', () => {

    const mockSuccessResponse = {list: [34, 10, 12, 45]};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
        json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const wrapper = mount(App)

    test('it can play a game as requested', async () => {
        expect(wrapper.find('.play-helper').classes()).toEqual(['play-helper', 'hidden'])
        expect(wrapper.find('.events').classes()).toEqual(['events', 'hidden'])

        const select = wrapper.find('select')
        select.findAll('option').at(1).setSelected()
        expect(global.fetch).toHaveBeenCalledTimes(1);
        await Vue.nextTick()
        await Vue.nextTick()
        await Vue.nextTick()
        await Vue.nextTick()
        expect(wrapper.vm.currentList.length).toBe(4)

        const cardList = wrapper.findComponent(CardList)

        wrapper.find('button').trigger('click')
        await Vue.nextTick()
        expect(wrapper.find('.play-helper').classes()).toEqual(['play-helper'])
        expect(cardList.exists()).toBe(true)

        const cards = wrapper.findAllComponents(Card)
        
        cards.at(1).vm.$emit('clicked')
        await Vue.nextTick()
        cards.at(2).vm.$emit('clicked')
        await Vue.nextTick()
        cards.at(0).vm.$emit('clicked')
        await Vue.nextTick()
        cards.at(3).vm.$emit('clicked')
        await Vue.nextTick()
        
        expect(wrapper.vm.events).toEqual([
            'Player selected to play with 4 cards',
            'Player flipped 10',
            'Player flipped 12',
            'Player flipped 34',
            'Player flipped 45',
            'Player won!!'
          ])
        
        global.fetch.mockClear();
    })
})