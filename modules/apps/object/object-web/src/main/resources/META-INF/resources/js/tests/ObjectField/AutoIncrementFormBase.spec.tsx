import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import React from 'react';

import {AutoIncrementFormBase} from '../../components/ObjectField/AutoIncrementFormBase';
import {useObjectFieldForm} from '../../components/ObjectField/useObjectFieldForm';

const initialValues: Partial<ObjectField> = {
    indexed: true,
    indexedAsKeyword: false,
    indexedLanguageId: '',
    listTypeDefinitionExternalReferenceCode: '',
    listTypeDefinitionId: 0,
    readOnly: 'false',
    readOnlyConditionExpression: '',
    required: false,
};

describe('AutoIncrementFormBase Component', () => {
    it('render correctly', () => {

        const {result} = renderHook(useObjectFieldForm, {initialProps: {initialValues, onSubmit: () => {}}});

        const {debug} = render(
            <AutoIncrementFormBase 
                disabled={false}
                errors={{}}
                setValues={result.current.setValues}
                values={result.current.values}
            />
        );

        result.current.setValues({
            required: true
        })

        console.log(result.current.values);

        // debug();
    })
})