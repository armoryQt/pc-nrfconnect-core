/* Copyright (c) 2016, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *   1. Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form, except as embedded into a Nordic
 *   Semiconductor ASA integrated circuit in a product or a software update for
 *   such product, must reproduce the above copyright notice, this list of
 *   conditions and the following disclaimer in the documentation and/or other
 *   materials provided with the distribution.
 *
 *   3. Neither the name of Nordic Semiconductor ASA nor the names of its
 *   contributors may be used to endorse or promote products derived from this
 *   software without specific prior written permission.
 *
 *   4. This software, with or without modification, must only be used with a
 *   Nordic Semiconductor ASA integrated circuit.
 *
 *   5. Any software provided in binary form under this license must not be
 *   reverse engineered, decompiled, modified and/or disassembled.
 *
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
 * OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { PropTypes } from 'react';
import Infinite from 'react-infinite';
import Immutable from 'immutable';
import LogEntry from '../components/LogEntry';

class LogViewer extends React.Component {
    componentDidMount() {
        if (this.props.onMount) {
            this.props.onMount();
        }
    }

    componentWillUnmount() {
        if (this.props.onUnmount) {
            this.props.onUnmount();
        }
    }

    render() {
        const {
            autoScroll,
            logEntries,
            containerHeight,
            elementHeight,
            infiniteLoadBeginEdgeOffset,
            headerText,
            cssClass,
            headerCssClass,
            headerTextCssClass,
            headerButtonsCssClass,
            infiniteLogCssClass,
        } = this.props;

        return (
            <div className={cssClass}>
                <div className={headerCssClass}>
                    <div className={headerTextCssClass}>{headerText}</div>
                    <div className={headerButtonsCssClass} />
                </div>
                <Infinite
                    elementHeight={elementHeight}
                    containerHeight={containerHeight}
                    infiniteLoadBeginEdgeOffset={infiniteLoadBeginEdgeOffset}
                    className={infiniteLogCssClass}
                    autoScroll={autoScroll}
                >
                    {logEntries.map(entry => <LogEntry {...{ entry }} key={entry.id} />)}
                </Infinite>
            </div>
        );
    }
}

LogViewer.propTypes = {
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
    logEntries: PropTypes.instanceOf(Immutable.List).isRequired,
    autoScroll: PropTypes.bool.isRequired,
    containerHeight: PropTypes.number,
    elementHeight: PropTypes.number,
    infiniteLoadBeginEdgeOffset: PropTypes.number,
    headerText: PropTypes.string,
    cssClass: PropTypes.string,
    headerCssClass: PropTypes.string,
    headerTextCssClass: PropTypes.string,
    headerButtonsCssClass: PropTypes.string,
    infiniteLogCssClass: PropTypes.string,
};

LogViewer.defaultProps = {
    onMount: null,
    onUnmount: null,
    containerHeight: 155,
    elementHeight: 20,
    infiniteLoadBeginEdgeOffset: 135,
    headerText: 'Log',
    cssClass: 'log-wrap',
    headerCssClass: 'log-header',
    headerTextCssClass: 'log-header-text',
    headerButtonsCssClass: 'padded-row log-header-buttons',
    infiniteLogCssClass: 'infinite-log',
};

export default LogViewer;
