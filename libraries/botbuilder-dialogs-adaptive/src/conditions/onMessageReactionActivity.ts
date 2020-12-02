/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ActivityTypes } from 'botbuilder-core';
import { Dialog } from 'botbuilder-dialogs';
import { OnActivity } from './onActivity';

/**
 * Actions triggered when a MessageReactionActivity is received.
 */
export class OnMessageReactionActivity extends OnActivity {
    public static $kind = 'Microsoft.OnMessageReactionActivity';

    /**
     * Initializes a new instance of the [OnMessageReactionActivity](xref:botbuilder-dialogs-adaptive.OnMessageReactionActivity) class.
     * @param actions Optional. A [Dialog](xref:botbuilder-dialogs.Dialog) list containing the actions to add to the plan when the rule constraints are met.
     * @param condition Optional. Condition which needs to be met for the actions to be executed.
     */
    public constructor(actions: Dialog[] = [], condition?: string) {
        super(ActivityTypes.MessageReaction, actions, condition);
    }
}