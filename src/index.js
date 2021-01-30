import { Tooltip } from 'bootstrap/dist/js/bootstrap';
import { Octokit } from "@octokit/rest";
import Vue from "vue";

import './style.scss';

Vue.component('player', {
    props: ['url', 'is-active', 'is-pip'],
    template: `
        <div
            v-show="(!isPip || (isPip && isActive))"
            v-bind:class="(isPip ? 'pip' : '')"
        >
            <iframe :src="url"></iframe>
        </div>
    `
});

new Vue({
    el: '#app',
    data: {
        players: [
            {
                id: 'twitch-embed',
                isPip: false,
                url: 'https://player.twitch.tv/?channel=fefelxgg&parent=traskin.github.io&parent=owl-buvette.test'
            },
            {
                id: 'youtube-embed',
                isPip: true,
                url: 'https://www.youtube.com/embed/live_stream?channel=UCI45pR3yMi0uGE47ewT43Ow&autoplay=1'
            }
        ],
        flipX: false,
        flipY: false,
        pipActive: true,
        owlFR: 'https://www.youtube.com/embed/live_stream?channel=UCI45pR3yMi0uGE47ewT43Ow&autoplay=1',
        owlEN: 'https://www.youtube.com/embed/live_stream?channel=UCiAInBL9kUzz1XRxk66v-gw&autoplay=1',
        contendersFR: 'https://www.youtube.com/embed/live_stream?channel=UCJIvTeyysEHViDfNz3stLYQ&autoplay=1',
        contendersEN: 'https://www.youtube.com/embed/live_stream?channel=UCWPW0pjx6gncOEnTW8kYzrg&autoplay=1',
        flashOPS: 'https://www.youtube.com/embed/live_stream?channel=UCjmE_Ed2R-Rk2ciRtkzwSrA&autoplay=1',
        nextTournaments: 'https://cc.163.com/260825191/'
    },
    methods: {
        mirrorPip: function () {
            this.flipX = !this.flipX;
        },
        movePip: function () {
            this.flipY = !this.flipY;
        },
        togglePip: function () {
            this.pipActive = !this.pipActive;
        },
        switchPlayer: function () {
            this.players.forEach(function (player, index, array) {
                array[index].isPip = !player.isPip;
            });
        },
        reloadPlayers: function () {
            document.querySelectorAll('#players iframe').forEach(player => player.src += '');
        },
        changeCast: function (event) {
            if (document.querySelector('.dropdown-item.active')) {
                document.querySelector('.dropdown-item.active').classList.remove('active');
            }
            const owlPlayer = document.querySelector('#youtube-embed iframe');
            let newCast;
            if (event.target) {
                newCast = event.target.hash.substring(1);
            } else {
                newCast = window.location.hash.substring(1);
            }
            owlPlayer.src = this[newCast];
            document.querySelector('.dropdown-item[href="#'+ newCast +'"]').classList.add('active');
        },
        reloadChat: function () {
            document.querySelector('#chat').src += '';
        }
    },
    mounted: function () {
        if (window.location.hash) {
            this.changeCast(this);
        }
        this.switchPlayer();

        let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new Tooltip(tooltipTriggerEl, {
                placement: 'bottom',
                fallbackPlacements: ['bottom'],
                animation: false,
                trigger: 'hover'
            });
        });

        const octokit = new Octokit();
        octokit.repos
            .getLatestRelease({
                owner: 'TrAsKiN',
                repo: 'owl-buvette',
            })
            .then(({ data }) => {
                document.querySelector('#version').innerHTML = data.tag_name;
            });

        let isResizing = false;
        let x = 0;
        const resizer = document.querySelector('#resizer');
        const chat = document.querySelector('.col-chat');
        const root = document.querySelector(':root');
        resizer.addEventListener('mousedown', e => {
            isResizing = true;
            x = e.x;
        });
        window.addEventListener('mousemove', e => {
            if (isResizing === true) {
                const position = (chat.clientWidth + (x - e.x)) + 'px';
                root.style.setProperty('--chat-width', position);
                x = e.x;
            }
        });
        resizer.addEventListener('mouseleave', e => {
            if (isResizing === true) {
                isResizing = false;
            }
        });
        window.addEventListener('mouseup', e => {
            if (isResizing === true) {
                isResizing = false;
            }
        });
    }
});
