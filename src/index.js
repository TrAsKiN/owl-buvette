import { Tooltip } from 'bootstrap/dist/js/bootstrap';
import { Octokit } from "@octokit/rest";
import Vue from "vue";

import './style.scss';

Vue.component('player', {
    props: ['url', 'is-active', 'is-pip'],
    template: `<iframe
        v-show="(!isPip || (isPip && isActive))"
        v-bind:class="{pip: isPip}"
        :src="url"
    ></iframe>`,
});

Vue.component('link-cast', {
    props: ['hash', 'name', 'active'],
    template: `<li><a
        v-bind:class="active"
        :href="hash"
        class="dropdown-item"
    >{{ name }}</a></li>`
});

Vue.component('theme', {
    props: ['hash', 'name', 'active'],
    template: `<li><a
        v-bind:class="active"
        :href="hash"
        class="dropdown-item"
    >{{ name }}</a></li>`
});

new Vue({
    el: '#app',
    data: {
        players: [
            {
                id: 'host-embed',
                isPip: true,
                url: 'https://player.twitch.tv/?channel=fefegg&parent=traskin.github.io&parent=localhost'
            },
            {
                id: 'cast-embed',
                isPip: false,
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
                disabled: true,
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
        themes: [
            {
                hash: '#dark',
                name: 'Sombre',
                disabled: false,
            },
            {
                hash: '#light',
                name: 'Lumineux',
                disabled: false,
            },
            {
                hash: '#peps',
                name: 'Team Peps',
                disabled: false,
            },
            {
                hash: '#atl',
                name: 'Atlanta Reign',
                disabled: false,
            },
            {
                hash: '#bos',
                name: 'Boston Uprising',
                disabled: false,
            },
            {
                hash: '#cdh',
                name: 'Chengdu Hunters',
                disabled: false,
            },
            {
                hash: '#dal',
                name: 'Dallas Fuel',
                disabled: false,
            },
            {
                hash: '#fla',
                name: 'Florida Mayhem',
                disabled: false,
            },
            {
                hash: '#gla',
                name: 'Los Angeles Gladiators',
                disabled: false,
            },
            {
                hash: '#gzc',
                name: 'Guangzhou Charge',
                disabled: false,
            },
            {
                hash: '#hou',
                name: 'Houston Outlaws',
                disabled: false,
            },
            {
                hash: '#hzs',
                name: 'Hangzhou Spark',
                disabled: false,
            },
            {
                hash: '#ldn',
                name: 'London Spitfire',
                disabled: false,
            },
            {
                hash: '#nye',
                name: 'New York Excelsior',
                disabled: false,
            },
            {
                hash: '#par',
                name: 'Paris Eternal',
                disabled: false,
            },
            {
                hash: '#phi',
                name: 'Philadelphia Fusion',
                disabled: false,
            },
            {
                hash: '#seo',
                name: 'Seoul Dynasty',
                disabled: false,
            },
            {
                hash: '#sfs',
                name: 'San Francisco Shock',
                disabled: false,
            },
            {
                hash: '#shd',
                name: 'Shanghai Dragons',
                disabled: false,
            },
            {
                hash: '#tor',
                name: 'Toronto Defiant',
                disabled: false,
            },
            {
                hash: '#val',
                name: 'Los Angeles Valiant',
                disabled: false,
            },
            {
                hash: '#van',
                name: 'Vancouver Titans',
                disabled: false,
            },
            {
                hash: '#was',
                name: 'Washington Justice',
                disabled: false,
            },
        ],
        flipX: false,
        flipY: false,
        pipActive: true,
        showChat: true,
        aboveChat: false,
    },
    methods: {
        mirrorPip: function () {
            this.flipX = !this.flipX;
            localStorage.setItem('flipX', this.flipX);
        },
        movePip: function () {
            this.flipY = !this.flipY;
            localStorage.setItem('flipY', this.flipY);
        },
        togglePip: function () {
            this.pipActive = !this.pipActive;
            localStorage.setItem('pipActive', this.pipActive);
        },
        toggleChat: function () {
            this.showChat = !this.showChat;
            localStorage.setItem('showChat', this.showChat);
            document.querySelector('html').classList.toggle('fullscreen');
            if (!this.showChat) {
                document.querySelector(':root').style.setProperty('--chat-width', '0px');
            } else {
                document.querySelector(':root').style.setProperty('--chat-width', '380px');
            }
            if (this.aboveChat) {
                this.moveAbove();
            }
        },
        switchPlayer: function () {
            this.players.forEach((player, index, array) => {
                array[index].isPip = !player.isPip;
                if (player.isPip) {
                    localStorage.setItem('pip', player.id);
                }
            });
            console.log(localStorage.getItem('pip'));
        },
        reloadPlayers: function () {
            document.querySelectorAll('#players iframe').forEach(player => player.src += '');
        },
        changeCast: function (event) {
            if (document.querySelector('#casts .dropdown-item.active')) {
                document.querySelector('#casts .dropdown-item.active').classList.remove('active');
            }
            const owlPlayer = document.querySelector('#cast-embed');
            let newCast;
            if (event.target) {
                newCast = event.target.hash;
            } else {
                newCast = window.location.hash;
            }
            owlPlayer.src = this.casts.find(cast => cast.hash === newCast).url;
            document.querySelector('#casts .dropdown-item[href="'+ newCast +'"]').classList.add('active');
        },
        reloadChat: function () {
            document.querySelector('#chat iframe').src += '';
        },
        switchTheme: function (event) {
            if (event.target) {
                event.preventDefault();
                if (document.querySelector('#themes .dropdown-item.active')) {
                    document.querySelector('#themes .dropdown-item.active').classList.remove('active');
                }
                localStorage.setItem('theme', event.target.hash);
            }
            document.querySelector('body').className = '';
            document.querySelector('body').classList.add('theme-'+ localStorage.getItem('theme').substring(1));
            if (document.querySelector('#themes .dropdown-item[href="'+ localStorage.getItem('theme') +'"]')) {
                document.querySelector('#themes .dropdown-item[href="'+ localStorage.getItem('theme') +'"]').classList.add('active');
            }
        },
        moveAbove: function () {
            this.aboveChat = !this.aboveChat;
            localStorage.setItem('aboveChat', this.aboveChat);
            document.querySelector('html').classList.toggle('above');
            if (!this.pipActive) {
                this.togglePip();
            }
        },
        reloadSettings: function () {
            if (localStorage.getItem('flipX') == 'true') {
                this.mirrorPip();
            }
            if (localStorage.getItem('flipY') == 'true') {
                this.movePip();
            }
            if (localStorage.getItem('pipActive') == 'false') {
                this.togglePip();
            }
            if (localStorage.getItem('showChat') == 'false') {
                this.toggleChat();
            }
            if (localStorage.getItem('aboveChat') == 'true') {
                this.moveAbove();
            }
            if (localStorage.getItem('pip')) {
                this.players.forEach(player => {
                    if (player.id == localStorage.getItem('pip') && !player.isPip) {
                        this.switchPlayer();
                    }
                });
            }
        },
    },
    mounted: function () {
        this.reloadSettings();
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', '#dark');
        }
        this.switchTheme(this);
        if (window.location.hash) {
            this.changeCast(this);
        }

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
    }
});
