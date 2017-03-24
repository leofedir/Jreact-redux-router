import React, { Component } from 'react';

class MainMenu extends Component {
    componentWillMount() {
    }

    render() {

        return (
            <div>
                <div className="icons-menu" id="menu">
                    <div className="slider" id="slider"></div>
                    <img className="hide_menu_icon" id="hide_menu" src="./img/hide_menu.svg" alt="Сховати меню" />
                    <img className="zoom_in_icon" id="zoom_in" src="./img/plus.svg" alt="Сховати меню" />
                    <img className="zoom_out_icon" id="zoom_out" src="./img/minus.svg" alt="Сховати меню" />
                    <img className="geolocate_icon" id="geolocate" src="./img/geoposition.svg" alt="Сховати меню" />
                    <div className="menu_item">
                        <a href="#" data-folder="___" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABVRJREFUeNrkW1FyozgQVaj8hz1BvCew5wT2fPBt5wRDThBuMM4NyAmCT7DOtz8Gn2DMCZbcIJwgi9QNlh0BklpivGVVkZqawqj7qfv1ayFuPj8/2SijiGb137C+FgN35vX1waa7wxhm3XgDABxeocNzy6fsEZCtL0DcAlBEk/pvjNe9Y1vf6ysT13RXXhYA4Pi6vn6Mk09sI+ZzAAQNgPEddw5EQHA+qf8e/qDzDOc+oC0jRUARhYKU7InN19gL0p3uPvwBAMzOWfmOXeaoRNUxqBiBgfPxhTvP0La8tnXlNgLA+Vf2/xqPdSRkdAAAzX88GfkuVB9jU0/Pf6hB2NoD4D/n/0YASk9zDHJCMMD2Pp3fiPoNrJ165oTQhgS3IxLe1jMxbs0AAGHhss4XWKflsej4t48x7xJLQY+8dSFMHuvrrzrMZ/XFc/EG/69CFXkOwLPgBX4f3Ms54gXJkjrW6NsACRZRZilv37Dfh5ye7prc41Vk0vb68P8TpX6H+2N8DhMgNSwO1YgamZx34m4AAKF/yUzb3yS91PcmHal3UJTEpg1OT2QuVKjfVpVHAj/4EiZ2JFO2K1hEKYLYFUVPSlYGh1R6gO8r/BRzyAoPAK+sUkEZAXarf1xVCP2Vpqj5GgVFtEZHdbglJaZDGwUyALoGuBrfBR/4V5uq8VzPvT4HoCRsY1VYa03Jc48EeW9MZkCUS2sJPt1NjhwA+UfZw0uQXd+M67P5vBXOlRDsvUefWxJcER5WSV3XVjsEeQqcXg+av82QBEsLwOWxkgGgKLFjnQYg9JiZ5798AYnqjFSqBhnB7oUMAEVcNAaZRMFPhSrTcabAlU/FHgWIpMrS7jkAgLlAIJMDhtMdbpzodnaxVAIXmlyQSnxFj4L6WYEkU21XP5TYf4WAuNDuXenWkN8So4iSBiEHYEY0SNbWjVE++vuNgrAbwAtbHggIBr1hPiYKdvXR32dtqsnll5gGAWn11fohcVCiVFyTn0VbU88XfwKApvYnPSIjc7r6kFpzJZlCl7gZE4DtgIBKiCVKFf5xp6A5vq0aDYAUS95dn8pyFAV7TKm4px1fIeDvYwAg1/7uPYJTcUQN/yGdkBhKcRIATe0f6sRiYomSu8x4SFjbll8OQG60+rCqoUZ+zwi7TEewgeB0mrUFpooJGea3Bk1IgZN8iN9AWIY995fY9PBy+Y2Z79/J7/Zmg4q12VzhrTLsbehs7nzcijAtIh2DypNNSbNDSyVGj0nvn0tzlS2gmhJXsyM9BNLOzNBYIvPbhbL5xse275VWT4PD0+VJczeqJUFdHng1BsH+PcMUK0BoMJeJKsxlAEzKx6vYQB0yjLNyEW0Z7QzRksHLzYWG85xsfzH995nCZ8qmaIVo8wcdBD9AKWoOSA453u7MooO/NEI2Qy7Kpd/NUAeY2N5uit6eyU2TbfE7zLUnNIZ5HvO2F6DPlamEUMauZygAMBcRzowYeWxcvxu0GS8nb4chp59Hmnvd3QuMEwWPyrfDQIjfxlz9rmZo7bCPV7W2WZ8y8xgJlSrCA4URpcdUSB3dYxf6ikMZ3cfkiihn9HNC75KGz9u6PyxqEqkDDBn9HOFeHNFRjD4AQkY7v/fMzk912A7aecVKdJIddvg7KAmHnNwNkNVLC+ctD0oeSSkmrJrLMbH4TTzUtl/9YelAM5z5gx48lkfX5e5Bx3n9CHBDRmM57+mDiSMnTDR3kMYee2R7o+8L7b8ag1q9voBoqFDkWAko+5ejMOFs5A7yq7bnNlg6T4uA02iYsKv8cFINRMyu7tPZ7opxZR9PDwNycZ/P/yfAAGxBXqLM0UIvAAAAAElFTkSuQmCC)'}}> </i>
                            <span className="icons-menu__text">Закони та правова база</span>
                        </a>
                        <a href="#" data-folder="___" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABIBJREFUeNrsW81t2zAUZoTck05Qd4K46ABx0QGqTBB5grinHs0ce4ozQewJqgxQVB6gqDJB7Q3sCVK+4GPBsBJFUpRNwX4AYcSOHvk+vn9SJ8/Pz2wX9Ovbp6H4OBdjpHx9js+N8l1Bf3/4+qPcxbpOugIAAqcQ+NKTzRKA5F0BEhQAIfRAfGQYbwOvdS3GnIYAYxUVABCci3HNdkMLmi8EEK0A2IPgwYFIWgg/ER/lHoVnmLvEWnajAWIy8tx5C8fWFZHDTIU2bDoDAJ6dvPIZi5O2FHVcIkbiIHwWufAMayvEWtOgGgDhH1i/aCw0Yd4aAKD5nfWTrgQIuTcAPbD51j6hFgB4+5WF8FtkaCrSBNykg2zQF4RBXXQ4NTyYWwh/j0REZ05aM0N8vovAMeZaEWbWAMuFv3IyyAoHeiUXkRl9EeuaNQIAQcqGBT8KZqkhMXqigkgCEYkjJVMY6mlzVR7ALXZroqm7nhVeIB6/1PvwxMsITIEbEyHsflNuv5QoYmcvDBNmmk/ZN11DxloN4BZMCs3bm0h1PCWLg3glAJa7r9PG4/dxh+ZAfG9dtEDVgMxykpGDWv+nLRQ5xCAeH1HPh+oLvAffwuL/szYAXCrObWVAfKHl4q9qdvFbIQbN+Q75xNZR6DXmfkN8HHuG2aswiFj924HBvZhwotULqoC5GnPVMCi+PzFknhOMswbBeV2hI/iQFvy0kIE0ppSZYOqI/o2YaCajAcKcyRxmTQyRTXLiCxCmFXF8YlPhWRLJXCYVdm1LVgsRAnGXmoCAEIOeedS9t6XwKxdfJgHwaW9dNvXiYFpTzx1Sea+r0tgaAG0BeJE5wSK9Y6qeWPhoiYUgK9YBkewJCpg26WWdM5oZssRY6DyxyOZMpbA0BV7hiW8Ur/0UKQCjpMXDuQLCVJoSwtlc87abWFUgafk8xw6r9q56/dtdnfLuBQDEbumtL8TuzxXVf0I4C0FFrBogkyAZs6+VpCVlPaAkEJ9My+V5yCPs6AGAKWRKw2TGekKhNECawn1fVF/SKRzMNBAIE9YvKpKYY/QOaJPEHqe7JJJd+oDlAcq/VJ1gcYAAFCoA+QECkP8DAH5gfUDCr6XvS0I0L3pI86pE6LABQO6+CD0TWmaXyt9Zl5I1tOiIFmqd4nM26LIYao7odQG3WGQbGln0MKprgZBagI4x8fus/UTNErrdyeUJU0DAh8x8BrGwvR+w9d1xCEaT0A2TuhOeM9QfZSiTsLjHuK3S8NOK9HCFJuedo6rbHGuxCm14wHx0vld4mFjG7C5kVfYoTLfECmY+MKHT3dJTcFN6yiUQYg1ycbdqew27nVaYVy1fnBwzFwCarsk9wuF0cflpiZ39IwEA2CmGy5zGa3IHf1EyaSoXmf29gRip8d5AY0sMra5xD4UfN90TtgIAIFDqeOUbHveg9le29wiOL0y4cAfjAYuzg7SEt3dq8Xm/NYZUl0egDVvkDl5nEd7nAphw2EUF6UA097DNQczxxcnjq7PHl6f3+vp8FZHAO3t9/q8AAwDimTjpnlrLsQAAAABJRU5ErkJggg==)'}}> </i>
                            <span className="icons-menu__text">Мапа та Генеральний план</span>
                        </a>
                        <a href="#" data-folder="Ludyna_hromadskist" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,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)'}}> </i>
                            <span className="icons-menu__text">Людина та громадськість</span>
                        </a>
                        <a href="#" data-folder="___" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,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)'}}> </i>
                            <span className="icons-menu__text">Земля та навколишнє середовище</span>
                        </a>
                        <a href="#" data-folder="Sots_dopomoga" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,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)'}}> </i>
                            <span className="icons-menu__text">Соціальна допомога</span>
                        </a>
                        <a href="#" data-folder="Zdorovya" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABU5JREFUeNrsW09oHFUY/97QW4TGS3IpmGwPRbBS9aDx0kAtKFgzAQ9WC26R2EJBg0KheuhavLZuD0KlB7Pgv4OQjR48aGFzMfVksV5NttBLckoOhV664/d782aZbGffzLz3Zv91P3gM2c28eb/f+/7vGxEEAfVCWqfeOMaXSR7zKf/a4LHr/frbnV6sSxRFgALsK8DHDadZV4TUiyLEKQEMeoYvZTWecbzWezxWMJiM5kARoIBXeLxPvZEanueCCCsCGDhsutpD4ElELDMRu6YTeBbgl/nS7CN4Us9uqrX0RgPUrtctHFtRsgbfk1cbchGgPHu9AAfn0lH6eSKGlwO8r0LSoIIntbaGWqs7AnhChLVVHgdp8AVrXFVrtjcBxeYqDacssjnUjQlQNt8Ykp1Pkj1kojqf0JUA5e3vDLjNZ3WMx7pFB50PWBkB8JFjXMnlBFVisUCjIwvdkqXHTECpfnOI7V7nD2Y6TSFJA6ojCD4Kj1WtBqiqbotGW2bjVWSnBlRo9KWSqAEud1+8MkdUOsyjRGLiKQru/kO0+V94ffBAf/PEBImjz4f3xyS4/SfPselcCw7EPiy7AC6WzhNNTe3//Lmj4ZXBB7/UKfjhu+T73z1D4i1fkvDYd6ffI9rZoaB6NSTSTsqRJsQ1oGkT98XypyROvJbtn/+9S62vrjKg7fBv1hSP76fZUqbbJYk3v7FKjlgDZtoEqJT3756AjwSmsKVUGsATdl1Lwo/fd9WkjPICUuTICfrG4Bf8/OCVrRNMAyMn+MgkpK8wFz8eBeaNpoDDOn2mb+4cPsNC5uMEHDdzeq8a7Z4zgfZMTZveLTF7yv7NxE4FXXhzEnNzxvcCOzRg0vjh09PmK0cEuPW7vRZwnmEhk56x/VtKsLFBwfZ2v7PCea9fT5aZHecD/RYrAgJOb40EOQDAw4HuWGqB6RpcEECGTkzuPjw4J0BdzSCtZnDkSO004PaGzM8zO70YcQihAgVPAoCAnWPr0sX059/6IzNRxWgAFnHzRoaFMqAPytT66IJMX7FrMnwhhieYgExx+XMUPjozyvLsNDlg78xYC2rfEr34UvI/8PcgwLv+daiuPLzPL4fguQjCdyKmzgAtZg+T+PCcJIy+vEK00JGpP3wYgrfcfRnKH735OsrCy9YzHTrEUfXpxFxBpqxJGRsDaL3zNnFREmoGyEBhFSVY2GV8Hnd0rUdhX4BJcCBfQAMaTgi4f5/EkWcZwCf5CiIecue5uvN++nl/ao1aY+lcW0MkYZ9ddAUe0oAP2HU1G3YwqF7L2ZvhUnitTuLlOX1dwaWzNAl3XSHIruf68JF0eB9fyGyfiATBXxv6ugLgERV23GaO8X7AutOZeZekqmYhoVTSFzUReAcOr0PW42Gw4TzH3FQqu5WisnCOMIMEJwnNKAh8G3NEQL2QRJtVVgLQkACPL06cTExyAoTAYsC3MTtriqZ2jpbOZ26dSfC6JMhe2k3ReCa4UtjjEM/RzkbqmgYeHd9iwe/D2hsCInAggeN99++v2ba7zQlQv5TUCicBmV1CriDBu+gQpUst/tvg+MfRjsSgJ1rQR6l1ni9OKodxkmJvBMHvKWz6foA6QVEZQQIqSQeldKfEkCiMyjmhNQbv5+0IlSk8Yjbsco80P/17mkoJ6uIPuT/A2n3dCXIvrVwkBwcn+iipJ8dTm6LqrO3ZIQR/lteeWuVm6grzREgdF4fEHLDGRbXm9IbM+IWJHKImBglrgxjqKDwUnavFZ/zWmDp7i4Tp4ACoPJKcqsnNT/xrc+MXJ8evzo5fnn6yX5//X4ABADc6gma8AJkpAAAAAElFTkSuQmCC)'}}> </i>
                            <span className="icons-menu__text">Здоров’я </span>
                        </a>
                        <a href="#" data-folder="Osvita" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABGVJREFUeNrsW01y0zAUVjzdN5wgYcUyYQuL+Aa4XKDuCQgnwJyg6QlIDgB1b+AuWOPuYEV6g+QERS98CoqRbcmW7NjNm9F4pqltfd/71ZM8eHp6Yk3I22+/pvwy5MMv+deEj83396/SJuY1cEUAAAcAPKv4mHsQErsixCoBHPSYX0KMkeW5PvKxpMHJWB8VAQAe8XHJmpEVvc8GEbUIaAG4dSK8GuDn/JK2CJ7h3Snm0owF8JdRJI9rBDZXQgEz4NawcUYAIjtF5XN2nLKlrGOSMTwD8OGRg2eYW8LnGli1AID/wrolV9wSlrUJAJu3rJtywUmIKxPQAZ+vHRNyCUC0X3cYvEzCOC87FAXBuAfgRWCMjbIACosZ64/M8oql/1wA5W3aE+1nXWGaLZtVFhD1ELxwhajQAqD936zf8lK2Ak+h/b5LpHQBaL+JlR01Nm74eM01MeDXF1S18XHX1AoSWHdyJv0QOg5AlIribGWG/Ewl6xK1R4DxzuF8QmEJ+xjAX05+MWoCtMGy2xUZj3xO4z0BKHl/tA26YTLIBVPhAkEboIl4nbW7Izeh+1NhAYlh5VcHNJneHBMgl/vMnxG1YBn3/L2+sABd8KuKoMVECfgk8/OwqgpzLCPSjGU7zIM3X3/q+v8+cBgA9xFxA0V1SWRSjz+xGd0MmzevyQJ0QY34w1MwHue1oqGJENrOauKBjwXu31gGPpXI1pUhETA1uIHM95oGf+EOjGg7FewRbNm/HZ3UIegqKdw/q/H+ScbsFhkzv4Oml0cG+kDqEEBRdAk/z/rcDaxjfYygbREgNKtqNHygATcpjBltgLZFgPBnXwpwMSY8yYkZZQG0CLSoPRKFuzVPgBTQxERiFDQRAmIAMEVkpFJVVgT6oPZAzJm1ScCDFPn3EZVSIKU3aJi0tCgho7H1hE0CtsLsCSgH+BFgZgAdZiyljIzGQWcJIJ/6ZOL7mSImlrR5WdRXUJAxxt8T1o4kRIBpRTYWpl5nJQky1qxd2XgVqrMRrEbIdcaUm5ChjYcQdtETvK/Z4xOycI0chdfEwqN2mAUBpj4oW41sxvM6x1U0wAesYJvL1P9lAuIqNyvkHHne6JCCDnA0bW6ZvU2bHeYqTdEt952hNLmibpJIbymyR6IBdogV6hTp1mf2d6r2vY2zTG2vkw5N/PwcqfES4ORCaqMIbBPWjCxVhZAOAQ9V+3d5S+mWZE+Al8nLq5IKMFCYa9e20VdV9wZDxSouYt2Tgzl7iuoszwqo+RFJ2p9j3d9Z7R9kAQnYmD3nAxL4h4j1T5SHqotOiSWsP+eEdrtAqh+KTokFDS5uXJt+blXqFayUNqjCth0H7xdtwnhly0Xm9uCEawnLlvulp8XRorrqIPgrnfaa1nF57O5cdMQdaI4XujtSpw8mTJ6OB49ZvQ6Ss1TH/h6KNmrxVf5qDKVwdATWsEWRU6kdV/mrMbxwWrKCdF7bo7yt3Is8fTh5+nT29PH08/58/o8AAwCTSWRsCttMWgAAAABJRU5ErkJggg==)'}}> </i>
                            <span className="icons-menu__text">Освіта</span>
                        </a>
                        <a href="#" data-folder="Culture" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,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)'}}> </i>
                            <span className="icons-menu__text">Культура</span>
                        </a>
                        <a href="#" data-folder="Nauka" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABUVJREFUeNrsW0uS2kgQrVb0yhvwCWBOgOYElk9g9QkQG28tn2DkExhvvbE4wcg3ECcYcQLDDWAz255KxxNRnZSQ6iMkYroiFNA0kuplZb58mSoenp+fxS3Gv99noXyZyiNq+Wopj+Obj4fqFvN66MsAABwD8DvLy2xhkKIvg3g1gAQ9ly8JjpnnuR7kkdMhjbEflQEAPJPHUtxmbOh+PgzhZIABgHs3ROAAPpUv1YDgBe5dYS638QB5M2LywoHY+hpEmLH0hmNvBgCzEytPxDjHibKOScYIDMAnIwcvMLdSzjX26gEA/0Pc11hJT8idDQBr/i3uczxJIxTWBriTmJ+4cEKjAcD2+xGDP0Bm/+pgpHlTdrhGgsXA4E/K+5/yeM8+m0GHdCHGwigLQFgMlecpn7+VK0Ye+BmfUXVIoRhqwHUZ75rE0kUIQN5WA67+Fwk2YyS8xoofHIos8p6Qy2adB2RjinuweARvyPFK4fDNQiNkVz0Aq/9rYMx/dC1u5HzJMz65XD/QrP6Q44thZTe1uEem9YARrP5Ggk8aYv+b/F+q8YCjZbievUD1gGRA8DsGPoH6rAnvk/wsb4hrm5HoQmAIA5xAZlGHumOpMcLG1QC/QwCS958eFVuJ1Foxhi8tiq5zOECt0jUWFvP6kyTyI/6IewBN8VsYMHrXivN3ONDkSd7K95GlEQjz2QCRR5dOu5ShjuX2VPGio2WvIlJDwEdvnPR6wosOsHn9fGDGJG8dEia5nAgz1BiR0ttfhiLr4RHx7zWFadKYVp9b1BunK2RtrAkIO4XA3HXlWQqbQrJ+6CFjnGt73IfK3Ao8YJPFpo+aCsuU7BLWQCmE/6dCHHwC75rI9y7XjR4dJ3aOeSjJPrpHOvDe+pOBw7lblsdtGyg7EOKpA/hQeG7OunjAmjHwwmBFSxisUDxIJ2oS1s/LPXuXtQFOdbcVE087cAV9v2zq0iKfx0ozZqd+F66/GIsBSqaoJg2rXAJ0pyc1pBolUAK91KS1VPQwbA1QcUWlFCdrDhirR4Yid297mlsbYEbepQirxVgNMFeaGVkHmRu1aA/Vu0L2t/cRWN7gyBSduHIdLlBmLWFwFLcbZcDAuLSimqQoZ+6tGM84Bpabj0KWxxtLalSGPwGcjqxNn98KvdoP2BoWJuok9yCo+MqNYgayzvkVL6IYqfa5VW6rKkFTHogYawvo8q4FSQqjLTXnJErZW4ukqI/4Vw1QGJ48USZVKDI2w+q+WG15VOjhqypyhzI6bxA76waP8zWKswHAAwfTQkhh7bXC8GtNuMzV1IdzIlZGh8q5B9ZV8i2CDjX3BQ46e1kTFvL/Tvk8VcCWCJm0Kd1p9iEkzCt8l9e5rhrMXS4EEqxD4Ss1LutwQANz38D6KQO/qqtMnL/uwf3P8+bPBnNhvu9PbVOHuPhCqQlyVH0lW/FYXG6pXTFOKHroLL1o3/l6OHqeOFaNQsKk0XlA6Vs6LkaX8eLhqG5/gO2N+bO9OQwRX2mU1M8PcsYJfYG/aN763iCx0zQxapefK+mMVnrPeQH3Lnqq/LQbJLSbpEBMX10sjVXtJLBgoFT0u+/4s5zPBaFe2yVWCvd9QudOkKboqj0i7iHNXcheCV6rJu95m5yJ65tvk6vVmtB3a+8JfHStxxC0lYti2I0TriNpK/dbnwugM7u6Q/Crtn3CnQygNDWe7iQcaI5PXR/Rv/5gwrSFhPS1HSH4LdjeqItk/asxiKVsBN5Aq57pRI53D2DesIaQ2QwIfgN5a10yv/5w8vWns68/nv5//3z+PwEGAEDG5AFRyOVUAAAAAElFTkSuQmCC)'}}> </i>
                            <span className="icons-menu__text">Наука</span>
                        </a>
                         <a href="#" data-folder="Vlada_vybory" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABINJREFUeNrsW01oE0EUfl3/iljaQsG2Qk1FwV5sKuTSg4l604MRjx6MCF4N6M0cIuQomB49COmhRyUe9Kjbi4KBtjlVsNhG8KdQaIqibazUeXmzbZJu9m9mN5tuH7w2Lbsv8755fzPzpmNraws8oVQhzH72MI6ZPKkyLkMmMufFsDpcAyBVCLGfcc5Rh1KmGeeroLgEiFwAUgWc4QTnUcljLTHOVgHJRJb8BQApnuTc7YHlTjJOywBCDADvFdcDIsmAKHsPQKqAwSzH+CS0ltaqLpeJ5L0DIFVAX7wH/qKXHIiyewCQyasuBDiZgTJuJ2MoNvP4nI+VB+6OKndPiQCQ8qoP/N0KYTB+y8ackOMCO8p3Q/vRReYOqnMAyOfnhGe+9wgrgg/bf2/xp4wMETOKCWYAyPH5B6POAHj9BeDdsozAGG6WHRSTVCeu/PhxZ8ojdR6UFRhz9oIgRVE5eV6OEqJ0jemUtAYA+X3OlWGUKwDPPhLPl70GIc11M7WApGvpbnWDAhvy99+tSI9Z4yBICC1JTXmXTjAedPbum2+Mv8oGYrh2FansMpP2zPf2XEHXAmTNfucBgMts1vuPitUAWsxAt6l+3iCL0P6WZAW1ITohRXnM+fhbj34wv59aAPizCXDjFMBIj7E8BG4bvC72fC/A4yLA+j9RABKaJSgN/xSjq0OkPA4QixiM9rMru5UaYNaxvmkuD99FGS8WyRpQ9ni/DAtI1McA2sAUK3rQ1Mf66PPUJ6rgMNqvVnaeQbe4c5ZYe9Ywa1RIxgwD4vnnncKqmYXZKY5ojbNtAXEpFZ9WvyOjuWIGGO4S8NQukoGyUKZcK4jLAwAHpc0opi20hpunKf0JAzBIslCmlhLlWEGsNghGxWa/nwakzX7VDRbI12UQFk0Y/ZHRIjCOnO8TXShFKQ0+/IC+MOtYDPr13RGAwwoFPrcrvDMsUV0YAPj1F+DpvGhaHEML6HH8OvommqdGV4a8K2eOHQK4f44sbX7VqZSQAuZndeaBr5UkNoawAgGnfQACrn9o3wICrv/SvgXsA0AHH0ElVeG7QEGlsuJVN5YviemuxYDpAKo/XRsE1QACkK8FIB9sACgOlAKkfFHbFq+tA3IBAiCnVwgFBYA1fQDIJCZtiRI/oBAn+2PI1TZL6J0NWqeZldYDYG87bK1RR6WhMLBnBfjl75dbpzx+t71JyDa2yui1byBCeE5g7ZzwFe/jcXoA6riIrdjdEda6zetIv0mK2kme7LHgp9sypzSpkbN7rDyeaNYvaLQfEOdBYy8UPUmj/YBmKyUMFrE2B6EEJuceitlyEWT0DbSu4Imbtc+bb4nRRYTbbah8zMpeh7U9wUwES8frbeIOJavKN0+Dzcj/neNFrrzlLkz7V2aomwzdIuoz5SeMor08AOqLpbQPrKEEdFdIdfKy83MBKpbCtleQcgPdI6BWeNWpEFkXJ0PcGm55uJ5Pi9wXlAtAPRAJzrIbrotc8ZwMxd0BYHfGiPNKTPTytNT7wt4AoA9IiMcNI0J/9uz6/H8BBgDcGppLCy0nUQAAAABJRU5ErkJggg==)'}}> </i>
                            <span className="icons-menu__text">Влада та вибори</span>
                        </a>
                        <a href="#" data-folder="Ekonomika_finansy" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABAdJREFUeNrsWz122zAMpvWy1zeIeoI4Y7tYGTpXPkHkpXN8gionqDK2i60TVF3bofLSteoJat/APoELuFCeokikfkBJdIz3+DTYIomPwEcApEaHw0F0IW9/fJnAYwzNUfw1hrb79e5D0sW8RroAIIVdUnjasJs1ARLpAoQVAFDahodH7ZJ5rltoK2wAxmZQAJDiPrRb0Y2EOB4HEK0A6EFxdiCsFsrfwSPpUXlBYyc0l24sAAZDJo9aEJsuQcJ0wRp22gAgZkdWfiWGKXvcdersGFYN5b2BKy9objHM1WW1AFJ+KcySOVjCqjUAhOZXYabMAISoMQAG+HxrTigFgNh+Y7DyWRDsst1BRoLRCSifEmNUaxegwGIqTkemZcHSMxeg8DZhWv1v1BfyiAAzjCV8g1ljmkFONbnCJB82FwGwYgpvH2CwRiEqLUIA7T137gBz8kpdgAbmiu13TV/EVYKGlrDgzh1Ix1IO8BkHa13AABACciNO8QtdgJD5yzjQTerzFE+gj49zFhKpUlkN80J5nY6bBQCR+cgZipLSroJQMae/k2VxMLeYmRjvYTw/7wIeM8pL4hPVbnJLCcxYpzvlxHvCAWSi3DW8OnJFrM9OqCVySTo/WoAr+hdb8ttEw3huFgBnAABsOgbAyQIwhLB3JYkQdbjnUWcr9YWeJZSEyb6uQVF3S+F7XSnvSYoxOq1zfKHJv+6rhssU7ZVOsKAvhxEU50IHrGmQwdDPqsAqfE6rsIR5wmqxWiyAVqmQ6WWxPxGyn8sZzAOgIKfAYoSnUN6lrbDTMpwOAIoIMKhwZDVRhMPcBKgHgKYEWOU9bgI0lQRZZfTm+2c0q58a+pbWBGE1E8oC+5QbS0OqibKVhbBkylcDMIDdsSIEE+K+KbUoi/Boq/s9BPOHOY5SDlgz9x1LfvMG4v7rLAnGzMgmHef2jRcpBSBijgRlGWY0EACiRwBoxbaMnTuKwsefBqT6wEnSqZVauYlxiS9xjx0BpFIIQcKToWt4x256zCZZhP9xgMaDkYUi10/vIExyFoMrkxTlDYy71fODERoAkeG893fNeceXCYAnFSidZ4NHpqULVkMSvzQXILMIGQfD1HYJIASKk5+uJKxyP8AWfBck8jUB3Hoi1c2tDDekzWbIAqtdkKAJION+0rwauLXliQ4V1XVEV0jKsltisTide0JrUN6pWw9wyWxMl72QnH1aFQKWveHKO7JynFUhqfEMBsBTxSHKkhgx9txA5eeq3aYSAAQCRogzQ9wB5zirclNcugtIqjmxeIkfTGQ4wRb8FSSuCo9dN/do/NUYBUv+AKwBV91XZZ4sFpCzhoDC1LBH5UMKb4OmHZw/nDx/Onv+ePplfz7/T4ABAD2N57nhR6ibAAAAAElFTkSuQmCC)'}}> </i>
                            <span className="icons-menu__text">Економіка та фінанси</span>
                        </a>
                        <a href="#" data-folder="___" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+VJREFUeNrkW92R2jAQFhreQwc4FYSr4EwF4SYFHHRA3vKG7y1vcBUECsjEVBBTQUgFMR1ABUR7t74RPsvWv2XYGY1nwJa1n1a7367k3vl8Jj7k25e7EbsMWIsbbs1YO37/+WfvY1w9VwCgwhNU+F6zmx0CkroCxCoATOmIXabYhpbHemBtDY2BkQcFACqesPZI/MgG3mcDCCMAWlC8Cog5A+Ko2wE1UH7OLvsWlSf47hzH4scC2MvAk6cGjs2VbMH3qFqDEgDo2cErfyBhCjjKiUrEoArKTwNXnmDkydhYY6sAoPI/Ale+EBjjbxyz+RJgHQGZ+UW6KWO2HDJtADqw5pvkBEy0zicIAUBvn3dYed4xjkTRoc4HpFegfOEY10pOEInFPbke+SwiS++WANLbfWCzf8JZ5M14rjhG6CMqL4V+xY1JgKYPDC8tTVSq6KDhvhVmqtUWgLP/LzT7Zcr3BEs101iqH/ksklbM/rVLUukEcfYfAxzwwXYGibq+s4BpoDOWa/5X61O6BABxDgBS3mGgSroohg5R5zcLmAQ8y0dH/U54AGLSTckNno15AEKmvZkjAF50psVacERfZ6w9S4QyuGfM2pNPZEF3oMKRg74vCpTsRXBdCGL8lCtaQDlr4ckHgAwAgJHlWX/H2wXyxO5rZJ4NBU7TCBFTy7MeSSi/Qz5uTLtNNkTqskFXsw73wS7OWqHvv679gCkAteUmTlYKM35HXrfRXa9/KwAkMmaoYqoa2+AHExZr6gNy0r4YjYGSG5e+zc5YDC/KSztmyjH3e8LxgIvwhxwBylVb9rv3nIQ2UE0fUtT0Bi1kixn14WkDzhaP1NdprBAFdO9z7MxGRjgWzMqaW2q55DOuZcc7wcwGAKKdWCxD5yrPeAiDGQ9AKsjWVKPAHJ3ZnqfGeGChiAoXZ/64Z+Bw5MojAOkbADAgNhAjRoWy5MwrLVVfFgLPveQpsyfzPxSTQEvr9FZkXcUEuwpAbgUAdFQbC551V0FO9jX/Fb9vNR2vKgAb/hnTzdGxBS9uk4LLiHhz1JIVhCybssVUZYMJVm9kZIVnidqcfdnIcSIVu9+Vh6QwNi8VChJt1QUA/E+S936t4hl1p8SssMNA5CI9ly2ITBSWQshyIjV7n7QmvByRwZ06rnxcV5OkTeki6ea5gUKmTel+Y00Qk5pZB5WfyexQSRVFcTPjoSPLAcb4ILsBc20fTDQejtaygJJPiIpqSmihjrzuTSqV+LS/GkOylARgDS8MT7OYor8xgi8ctZw7wLtHusobWUDJGiJyix9OCoCYklv7dLYmYtzWx9MSgAT3+fx/AQYAKxjWafU40fkAAAAASUVORK5CYII=)'}}> </i>
                            <span className="icons-menu__text">Промисловість і торгівля</span>
                        </a>
                        <a href="#" data-folder="___" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABGZJREFUeNrsW91xozAQVph7jzuI04BDB+bFz3EqCKkguQqOq+ByFQQqCHn2w0EFR9xAcAdQQU5iF0eWBQbMysbnncEeM7al/bT77Y/ExefnJzMiy5nNX0f8cnZ8M+JXxiaLxMS0LsgAAIXnqPC047/ECEhIBUi/ACxnY/7q4nXV81xX/PKLa7JIjwsAUNzj170Zf2JBMV4PQOwHgHnFewfC2kP5J/6aHFB5hmMnOBdDFrCcjQpS6k5sVBIXpDtZZHQAALMLVr5kxyl5EXVaRAyrhfLukSvPcG4Rn+u8XwsA5V/YsOSBW4K/PwCA5isbptxxEMLuABy/z+/NCdUAANunA1ZeBmFcFR3qSDA8AeVLYgzbRQFILKbsdGRalSxtuwCkt8mJrL7qCraaNusswDOo/O+Cqc25gldvAbD6H4YmtMIVyfi4YmI/DI17LVuBpVl9U+KumXmy8BAQE+LpXQBW31Rl986VjpR7z8YqSNB1ywJcg6sfNrxHZ30HBsDZutNjm6s9AJDyXhEOmCufbU3u4TT4XV9yhTqvLWBO6u+w4vlGSIIKk9VYYEw8r7kMgEM4UIrFiCCenxIQHtYb5erfS+FRlLKOhih7d0NrnSpSAgA+nmG4E0AE6HKeEgEC/p1xkzq+l/SYy7fSFwjFVsguK8x9OROfHtEKblB5k0RccJ+FK0IpVf//hO4gTP9Nqzz94owsLSP3z7i6sJdJsd+vAYk0HFuGjM1fE96mJAhGqFl910RmagIAYeYZgw0MRwPASlF8hMXRC4bQwQOQYMgR0eAPVy5SgEiVVU/Q9L8T5wEMogC9ROjvDiruIRABKjtFsvORMJ+Lq6wUIVoMGgCZ+CIEwkUTL338L+uwqzMUF7A1QPiYFar9gUThg/EpAFCVZsv1f1CxgeGYACAiHuNS25EFH3/b0QvwqPnJwhBFLb801R+TwI80odAnLtGFZJYB0nkvqjtBehACx5pEKNOEQht/R0nKiSXV3nR5AJDeNcb8j2J11cxQhMjlLEFuEAehbEbbJotlEqTkgbIcTrHgucbVTde5/nIWFrkBKDzGspm1Pe3ROj+RAKBEeqSYXSplhrd49xabIB6x0rKEXwAAD1D15asqwSclDPqagogqDK5K7rM2KjYauakohyOp2Kkam6pB4usSIZ/Q3J4ryuFIAkPXDLk3BwD4ZkBmBXB4ydEA8K5Rfk5IzMGh9gZvsAr0pVwg20jEIBQKxV8Z3Q71ho668wG+gU5MjhNJ0Bxt/PxIPO5W4/XQByRyHCc3MF7DAxLwBY+ZkUvlnVK0h6rrTolF7HTOCcXFTlPLfsCc0W1OmpSc1fQWrZpKKWPbm5pDVN6pS6+tXeUiM3tuoG9xd5X7u1ti0Kp6GKDyD7vOCTcDAEAQsfpuIO6QMzgk3Si1Pz8w0ervvw46xEeofIzNlFYtvu5PjUGn1zsCa8gxyel0zK77vgAMaBNWkM1ye0hvO58xPD84eX509vzw9P/9+Pw/AQYAeQfgSEXU4ZUAAAAASUVORK5CYII=)'}}> </i>
                            <span className="icons-menu__text">Сільське господарство</span>
                        </a>
                        <a href="#" data-folder="Infrastruk_GKH" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,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)'}}> </i>
                            <span className="icons-menu__text">Інфраструктура та ЖКГ</span>
                        </a>
                        <a href="#" data-folder="Energetyka" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABQJJREFUeNrsW0FW2zAQNX7s8Q0wJ4hvQHKCmlWXOCdoWHVXzLIrnBPEYdcV7gVapxfAnKDhBE0uUCrRr7xByHESa0TcMu/5hRccW/M18+drLB88Pj56Luzj8EskPgJx9BtOLcWx+Dx5X7kY1wEXAHA4hsOnO15mBkAKLkCsAiCcDsVHguPY8lgfxJHLQ4Ax3ysA4HgqjnPPjU3l/WwA0QqAV3DcOhB+C+dH4qN6Rec93LvCWNxEgLiZZPKiBbFxmSTMWETDgg0AMLtk5SNvP20pq842FcPfwvlkz533MLZSjDW2GgFwfuJ1y4YiEvLWAADNW6+bdiZAKHYGoAM535oTagEA28877DwFIayrDutIsPgHnFfEWGwVARAW10yzka8ZkOSbD0xAXIgoyBoBgLytmGa/kZnF/SU475jAj3TZbEqBlDH0iw3OKRlTIV0bAZj9n0wDGAv0R+ReObT8PZh64Yh8T2gU+IbZ57ArzXn5t8zHARomq9wEEH2ELIelxhTA7J8z5J0UI6kmTwMsY2W4P7svOS9EdFhfQcLXFxGQMHRwZGgXCHeqJmUIphBa8u8r8j8lvuRvI6z5bVvCDcA9HJkLJ1XPYEnCPMf97uAsLU8L5P+tTBVxrjzvghUAzITNHp4iNRnqI+R6ZKgIA/w/IN/n+H6Acuyhfs8sju8YPq8iILYJr3QebB7uCqA62nR7GuzJ50NyQ9smB36pEWKg/V8JngG4QIXnpXatjGF8fRoBHO2tyCBEaBn8BKIca8BUNatS288Fnnz2VS7YNHHNR4OcnWll8EakSoi6nGsVQi9/dxxrBOm73yJPt7GpcFZPsx4J+SPCH3OE58zBuALfEKocq7DEQGZXiL5vSAU1KwnW730mDfCMB3zGiysVmEEIXWsLngKfN1oVkhEpG5sJNMCQEwGf0fkIjpQGIVQi74+QCrFBCE3Eb1OIpgHX2oALAPq4Kq0RQiMieAoCTka+LzXArNshx0UR9oHmdEDyPNDJyFSjca5aLS46A0CNEBrjO5MQGhq0+rGDJglPCtTI4Iosu0vU9a/KeRBlncN9rnLNxQG/DL2FiijEHspjjO8nWrroqu/SY3oK7XOGl8YLFZnNp+4wdMBviJ7eOjnMZKXPRS5rZHAIECJI3B/ggykIT7G+C1v4jnZjVSQSYtT9CVkkqaZIpTVV2KPSN8wQKwBiljPDcleBELhgfuqz7+hmlebYsuachUMeKCkABXeoYfZThH+khfgUPFCSji03AMUKAAzwwQEB9lHOcogg2ew8w2yUqASRVjU47EFdn+qA3EH4n5JP+ZwwwwaGCekJ9GvAs2m5SQrnBnKyBoDWeZKOZegRzKEGM4DQ1357ygmAr3ViplxkQxwbgwdK9AhuiTa4dyCIpi6fDS7JzULkew7HeprUVYujlSBiAiCtXQswRAEVQOoBSOmZH8KcY3E0UkqQgQin+v6AwxqEYq/d42n1rC8zrBCbevyxRsgnZCX4vWWX6kWEc22RGXDoebTbdzXjFhm/rqPjuWlLu7KZyfmmjlDs7b5TIyFE9tq29NY8+/zvN0r6G2j4pMOhnzRVksaWGKTqsIPOD5v2CW8EAEDIIWKWHQn7s012ijdyQAc5ge+FCcIJ4Z6WSDmmcFv1uPNbYxBL6R5Ew5PCq6vzViPAIJa4trFtrO29v/t/d95C8/bi5Nurs28vT//fr8//EWAAAGlgqtFdnTMAAAAASUVORK5CYII=)'}}> </i>
                            <span className="icons-menu__text">Енергетика</span>
                        </a>
                        <a href="#" data-folder="Ohorona_dovkillya" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABKJJREFUeNrkW91t2zAQpgW/JxvYG9R96FMLRBtYniAKOkDUCapOUPW9heUJqk5QBehT+1Bngjob2BOkvPSTISsULZE8WaoJCLIRh+J9vJ/vjqfR4+Oj6GJ8+fVmJm+X8vKP/DSX1/btqx/rLtY14gIAAgcQ+MpwmjsAknEB4hQAKfRU3kJcE8drfZBXSpcEY9MrACB4LK9r0c1Y0fNcAGEFwAkEdw6EZyF8JG/rEwov8Ow11tKNBsiHkSfPLBwb1yCHGUht2LIBAM9OXvlC9HPsKOq0iRheC+HDngsvsLZcrjVwqgEQfimGNW6kJqTWAADNr2KYYyFByIwBGIDNW/uEWgDg7TcDFr4MwrQuOuicYPYfCF84xqxVFACx6DrO3zPOfVVHlp6ZAOjtmnv3pUqOasyOPPecyRRmVdqs0oCYUXhiawtajBQ2VoBCdYAAv+MwhVhrAth9Tm4fIiwRr4jwPOXvsGPOc4fqMz3F7nOND4X6AQQys6TGPDaMa4mVADDv/k4hLC1kXkdbJQgJk2M80AKvonZcI6rGYfk9Rz6fwvmpBoHzDn5j5dIUiw/jDgC413DyKZxTCmFVppCUQrNLAOK9BoDyTrh2X5NjFFxj3iCDc8lLJpB5bwIBk/ArqLpqJEe+l8HyGdYWlAHwmQCYqewbHKCqcRvdPAxr88sAcNHeFyRY2X4BSKSIElHHADzJPPr88zVN/rsjrh/hmmvCZV5cRRorQdsw+aiXY3jiLgZpw/cGdHVeACQF38E0uBz0pcekXrTwbw6IzAWA4xq+53hCEppqcZdIaiLH838qkilXE44dzPEAUpGp2B7U2Da7vAObLHwChcz3LgBwoQHk1deaA4nccn4qbB7U9eTnGMD3AoCLI6puC0DeJKs7JQA0MkYA4ppsMXVROHEBwJ2u9u6gseFWUzix1gIXTjCs4e8zZHlr2KtNLE9qskVysiubOoZnqaIrzdl8ghh+7YDIzHE851oLctKAreXOqHY/tMwviuJHeWeXpZOqjaOeoe1TWVxObNQmoiltry12nbQq7OJMktY/LhGN1jtGeboi348g/D3U82C3AFBeQ3GfhMfiyLGOGqyBHOQfQ3K1jwKmfiBWLCaC8ATOs/Y2EKZMJ7yLilNTfuE1iOPanLpSyioAaduqYiQ8AL+14S5eKVabUsuE1BoOipxWYtC1ZerQUtP8pdBMz8FkE+x8AhATgzk+asJc3e4HFpEmVTFBUwAE1PCqSUiFE/QVf1pWQajWE0nlyfEiG7RZ7/5/D06H5cSpOG3fn0A9IWXsTjnwN2OFVz81AKQJdJ8KnlPquDYZgvNaidOPpeA5qVo17Q/Y9QAE14XQnTjWH1DSglj8f0PZVK3rEstF//qBbWoWftuCSNATU3Ch+kHrihCorD9wEIpGyW1rAEoUORwwAOGxusHRmiDS0psBCn9zrE+4EQAAgRjiYiDmQGtcNOkU10aBmshwvi9MlHzCVPA0MlqHOvGvKbpVam381hiaHuIeaMMOJMckDTc/GMEDZyfOHejZM1PhrTSgmqeLc3xxsgaIUJzbq7OaiHFeL083AKR3r8//FWAAalIskt2WN6kAAAAASUVORK5CYII=)'}}> </i>
                            <span className="icons-menu__text">Охорона довкілля</span>
                        </a>
                        <a href="#" data-folder="test" className="icons-menu__link">
                            <i className="icons-menu__icon " style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABKZJREFUeNrsW8tx2zAQhTW6W7cczVRgugIrFYSuwFQFlisIU0HkCkJVYKaCUBWEqsDSLblRFShY5VEDUSRAgB9A4+wMhpZHArEP+3m7BK/2+z0bQh5Wf3x+mfAxVXw15SN/vf+QDbGuq74AgMIBFL43nGYFQJK+AOkUAK60xy8hxk3Ha93yEdPgYGycAgCKR3w8smFkSffrAohWAFhQvHMgRi2Un/NLZlF5hntnWMswFsBvRpE8aRHY+hIKmAG3hrw3ABDZKSpfMzdlR1lHJ2OMNJQPHVeeYW0pX2vQqQVA+e/ssmTGLSFuDQDQfLWkxBrXW9NYzUFIjF0APh9bUJwC2ie+eJ8G//vZcJ4YOuhbAKL9xoLPP3OlFxXriQ1TLgVGry47yCwgsRTw6iL4HHTYJDAmWi4AYmErz1eSGuxgaDjnfR1ZOnMB0NvMcrr7WEdv+frIPZ4MXcEvz1tlAZEDuV5GbSMoY+IKkdQFsPuPzL7UmjpcwZT7P0LHWguIXGF0MjYHgrMynDuqBMCh3VdaQcvNOrGCkcYNXUmHhRWkLawgdBmAggU22eG4LQCHNAi6+MuBUnbepIApBe7cMGvdUdlcWEDgwM5rKy8wVhMJRBeYDqTkC0jOFV3xuRDPcM7U8HdTEYAhaC/V55S/c262dPMJPs8KC0ABdtKHIBPnY4+ehHawlNHjQwwI0t9D+P+aytoKmv2Vgh3/f4oFvRAoAGhR6gPUtrsIIMN13Y1amJ6JnwalgDUvmfETlPlZ0QS5Rn0/6XBdEwLAHzDQ5YrPKrmFZXQl01GPym7h39sC5BKF3QkWoGOFxOQSuAmTxIZGMu4pn0dFVwec3hMYXFXG0XXDzzT43K0X2zUAL1A+r1IQQTBAIJwgE8TMonQFAJl1WG42IGDRbi2FIPit5CYEwIZZ6kCNOzD3UNJ6npc4e9n8b2AVC1uVaNsgWKs8FDs0MlG5Fb57FomR29eXCEAgUb7oKovBsJaSdpzetABIW/z+pLlAPs8HlbFvApGJFfWGmCJ3A+ufjg3IyNkklJcRyKIS01sWGQG8X9XLIyv4MiQxK/oBfR0Vu9N5VA1rehtKe6pKx0Ia6zoNrQvloZiM7ByOxVEa5d9dDpQRVmIaTHsAYFEqhm4VtNkTYsYQAKRiFkg6nnxXzIl2m+rx9k2RJZAytwMAkBwBgKl2edNYoMNNixUxTUY9K78t3FPkAV1x8h+GCnil3ekzJR51PT4c1YjAW/h3VhfMKqL7tMG8mVhECUdtdUFsEj+OD19Png43PISgPHZiUxo8PSZuEtZR4SammzO3RbW+qLYWgFks2WVLptj9jaoYihQByHccAF+Sms8svPKQFI6TfJOxPEddYSLhHJWHr2SnxPpgh7ZkVdOLlPYDAgvlaR+yk6XTkaRSylHD7y5c+ansBPlIUS5mzL2DEzoSqspxZUsMpGd2gcrPmhC2Rj1BtKseLsQddmCrjWqb/y9M6MyOiT1mfjip11TH/h2K1jovYPzWGMhS5IA1nDyL1BXj5wK4oW+5dqB7+6bKt7KAkjV47D2+OFkDRMje26uzkozxvl6ebgCIc6/P/xVgAEMBKk4jMBVNAAAAAElFTkSuQmCC)'}}> </i>
                            <span className="icons-menu__text">Природні ресурси</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainMenu;
