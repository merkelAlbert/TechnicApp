import { isEmpty, find } from 'lodash-es';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Form from '../../../../../components/Form';
import Select from '../../../../../components/Form/Select';
import Text from '../../../../../components/Form/Text';
import Loader from '../../../../../components/Loader';
import Button from '../../../../../components/Button';

import { fetchAll } from '../../../../../store/actions/machineTypes';

import './style.scss';

const HomeMachinesViewFilters = ({
  onSubmit,
  loadData,
  isFetching,
  error,
  machineTypes
}) => {
  const [numberSpecifications, setNumberSpecifications] = useState([]);
  const [stringSpecifications, setStringSpecifications] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const handleMachineTypeChange = id => {
    setNumberSpecifications(() => []);
    setStringSpecifications(() => []);
    const selectedType = find(machineTypes, type => type.id === id);
    if (selectedType.specifications) {
      selectedType.specifications.forEach(specification => {
        if (specification.measure) {
          setNumberSpecifications(prevSpecs => [...prevSpecs, specification]);
        } else {
          setStringSpecifications(prevSpecs => [...prevSpecs, specification]);
        }
      });
    }
  };

  const handleSubmit = ({
    numberSpecifications: valuesNumberSpecifications,
    stringSpecifications: valuesStringSpecifications,
    ...values
  }) => {
    const fromNumberSpecifications = {};
    const toNumberSpecifications = {};
    const resultStringSpecifications = {};
    if (!isEmpty(valuesNumberSpecifications)) {
      valuesNumberSpecifications.forEach((spec, index) => {
        const { from, to } = spec;
        if (numberSpecifications[index]) {
          const id = numberSpecifications[index].id;
          fromNumberSpecifications[id] = from;
          toNumberSpecifications[id] = to;
        }
      });
    }
    if (!isEmpty(valuesStringSpecifications)) {
      valuesStringSpecifications.forEach((value, index) => {
        if (stringSpecifications[index]) {
          const id = stringSpecifications[index].id;
          resultStringSpecifications[id] = value;
        }
      });
    }
    onSubmit({
      fromNumberSpecifications,
      toNumberSpecifications,
      stringSpecifications: resultStringSpecifications,
      ...values
    });
  };

  return (
    <Form className="filters-form" onSubmit={handleSubmit}>
      {({ reset }) => (
        <Loader isFetching={isFetching} error={error}>
          <div className="filters-form__row">
            <Select
              className="filters-form__field"
              items={machineTypes}
              label="Тип техники"
              name="machineTypeId"
              onMutation={handleMachineTypeChange}
            />
            <Text
              type="number"
              className="filters-form__field"
              label="Цена (₽) от"
              name="fromPrice"
            />
            <Text
              type="number"
              className="filters-form__field"
              label="Цена (₽) до"
              name="toPrice"
            />
          </div>
          {!isEmpty(numberSpecifications) &&
            numberSpecifications.map((specification, index) => (
              <div className="filters-form__row" key={specification.id}>
                <Text
                  type="number"
                  className="filters-form__field"
                  label={`${specification.name} (${specification.measure}) от`}
                  name={`numberSpecifications[${index}].from`}
                />
                <Text
                  type="number"
                  className="filters-form__field"
                  label={`${specification.name} (${specification.measure}) до`}
                  name={`numberSpecifications[${index}].to`}
                />
              </div>
            ))}
          {!isEmpty(stringSpecifications) && (
            <>
              {stringSpecifications.map((specification, index) => (
                <div className="filters-form__row" key={specification.id}>
                  <Text
                    className="filters-form__field"
                    label={specification.name}
                    name={`stringSpecifications[${index}]`}
                  />
                </div>
              ))}
            </>
          )}
          {!(
            isEmpty(numberSpecifications) && isEmpty(stringSpecifications)
          ) && (
            <div className="filters-form__row">
              <Button
                className="filters-form__reset-button"
                onClick={() => {
                  setNumberSpecifications([]);
                  setStringSpecifications([]);
                  reset();
                  handleSubmit({});
                }}
              >
                Сбросить
              </Button>
              <Button type="submit">Найти</Button>
            </div>
          )}
        </Loader>
      )}
    </Form>
  );
};

const mapStateToProps = state => {
  const { machineTypes: types } = state;
  const {
    machineTypes: { isFetching, error }
  } = state.common;

  let machineTypes = [];
  if (!isEmpty(types)) {
    machineTypes = types.map(type => ({
      id: type.id,
      title: type.name,
      specifications: type.allowedSpecifications
    }));
  }

  return {
    isFetching,
    error,
    machineTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: async () => {
      try {
        await dispatch(fetchAll());
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeMachinesViewFilters);
