import { Tooltip } from 'bootstrap/dist/js/bootstrap';
import { Octokit } from "@octokit/rest";
import Vue from "vue";

import './style.scss';

Vue.component('player', {
    props: ['url', 'is-active', 'is-pip'],
    template: `
        <div
            v-show="(!isPip || (isPip && isActive))"
            v-bind:class="{pip: isPip}"
        >
            <iframe :src="url"></iframe>
        </div>
    `,

});

Vue.component('link-cast', {
    props: ['hash', 'name', 'active'],
    template: `
      <li><a
          v-bind:class="active"
          :href="hash"
          class="dropdown-item"
      >{{ name }}</a></li>
    `
});

new Vue({
    el: '#app',
    data: {
        players: [
            {
                id: 'twitch-embed',
                isPip: false,
                url: 'https://player.twitch.tv/?channel=fefegg&parent=traskin.github.io&parent=localhost'
            },
            {
                id: 'youtube-embed',
                isPip: true,
                url: 'https://www.youtube.com/embed/live_stream?channel=UCI45pR3yMi0uGE47ewT43Ow&autoplay=1'
            }
        ],
        casts: [
            {
                hash: '#owlFR',
                name: 'OWL FR',
                disabled: false,
                url: 'https://www.youtube.com/embed/live_stream?channel=UCI45pR3yMi0uGE47ewT43Ow&autoplay=1'
            },
            {
                hash: '#owlEN',
                name: 'OWL EN',
                disabled: false,
                url: 'https://www.youtube.com/embed/live_stream?channel=UCiAInBL9kUzz1XRxk66v-gw&autoplay=1'
            },
            {
                hash: '#contendersFR',
                name: 'Contenders FR',
                disabled: false,
                url: 'https://www.youtube.com/embed/live_stream?channel=UCJIvTeyysEHViDfNz3stLYQ&autoplay=1'
            },
            {
                hash: '#contendersEN',
                name: 'Contenders EN',
                disabled: false,
                url: 'https://www.youtube.com/embed/live_stream?channel=UCWPW0pjx6gncOEnTW8kYzrg&autoplay=1'
            },
            {
                hash: '#overwatchYT',
                name: 'Overwatch YT',
                disabled: true,
                url: 'https://www.youtube.com/embed/live_stream?channel=UClOf1XXinvZsy4wKPAkro2A&autoplay=1'
            },
            {
                hash: '#overwatchTTV',
                name: 'Overwatch TTV',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=playoverwatch&parent=traskin.github.io&parent=localhost'
            },
            {
                hash: '#blizzardYT',
                name: 'Blizzard YT',
                disabled: true,
                url: 'https://www.youtube.com/embed/live_stream?channel=UC3GriadTkHBnfgd2UFETGOA&autoplay=1'
            },
            {
                hash: '#blizzardTTV',
                name: 'Blizzard TTV',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=blizzard&parent=traskin.github.io&parent=localhost'
            },
            {
                hash: '#flashOPS',
                name: 'Kanezaka Tournaments',
                disabled: true,
                url: 'https://www.youtube.com/embed/live_stream?channel=UCjmE_Ed2R-Rk2ciRtkzwSrA&autoplay=1'
            },
            {
                hash: '#nextTournaments',
                name: 'NeXT Tournaments',
                disabled: true,
                url: 'https://cc.163.com/260825191/'
            },
            {
                hash: '#otpLoL',
                name: 'OTP LoL',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=otplol_&parent=traskin.github.io&parent=localhost'
            },
            {
                hash: '#steelSeries',
                name: 'SteelSeries',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=steelseries&parent=traskin.github.io&parent=localhost'
            },
            {
                hash: '#contendersTrials',
                name: 'Contenders Trials EU',
                disabled: false,
                url: 'https://www.youtube.com/embed/live_stream?channel=UCLj0Gz2FQKDyCWE5gk4iO_A&autoplay=1'
            },
            {
                hash: '#an4rchy',
                name: 'Retour des Héros',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=an4rchy_ow&parent=traskin.github.io&parent=localhost'
            },
            {
                hash: '#benbest',
                name: 'Team Peps - BenBest',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=benbest_ow&parent=traskin.github.io&parent=localhost'
            },
            {
                hash: '#weaq',
                name: 'Team Peps - WeaQ',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=weaq_ow&parent=traskin.github.io&parent=localhost'
            },
            {
                hash: '#tsuyo',
                name: 'Team Peps - Tsuyo',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=tsuyo_ow2&parent=traskin.github.io&parent=localhost'
            },
            {
                hash: '#logix',
                name: 'Team Peps - Logix',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=logix&parent=traskin.github.io&parent=localhost'
            },
            {
                hash: '#naga',
                name: 'Team Peps - Naga',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=nagaow&parent=traskin.github.io&parent=localhost'
            },
            {
                hash: '#fdgod',
                name: 'Team Peps - FDGod',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=fdgod_ow&parent=traskin.github.io&parent=localhost'
            },
            {
                hash: '#xerion',
                name: 'Team Peps - Xerion',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=xeriongdh&parent=traskin.github.io&parent=localhost'
            },
            {
                hash: '#khenail',
                name: 'Team Peps - Khenail',
                disabled: true,
                url: 'https://player.twitch.tv/?channel=khenail&parent=traskin.github.io&parent=localhost'
            }
        ],
        flipX: false,
        flipY: false,
        pipActive: true,
        showChat: true
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
        toggleChat: function () {
            this.showChat = !this.showChat;
        },
        switchPlayer: function () {
            this.players.forEach(function (player, index, array) {
                array[index].isPip = !player.isPip;
            });
            console.log(document.querySelector('.pip'));
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
                newCast = event.target.hash;
            } else {
                newCast = window.location.hash;
            }
            owlPlayer.src = this.casts.find(cast => cast.hash === newCast).url;
            document.querySelector('.dropdown-item[href="'+ newCast +'"]').classList.add('active');
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

        /*
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
        resizer.addEventListener('mouseleave', () => {
            if (isResizing === true) {
                isResizing = false;
            }
        });
        window.addEventListener('mouseup', () => {
            if (isResizing === true) {
                isResizing = false;
            }
        });
        */
    }
});
