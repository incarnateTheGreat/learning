"use client";

import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Cross2Icon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "learning/@/components/ui/Alert/Alert";
import { Button } from "learning/@/components/ui/Button/Button";
import {
  Card,
  CardContent,
  CardHeader,
} from "learning/@/components/ui/Card/Card";
import { Input } from "learning/@/components/ui/Input/Input";
import { Label } from "learning/@/components/ui/Label/Label";

import { doesManagerExist, updateManagerRow } from "../login/actions";

type FormInputs = {
  manager_ids_input: number;
};

const ManagerIds = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormInputs>();

  const [loading, setLoading] = useState(false);
  const [manager_ids, setManager_ids] = useState<number[]>([]);
  const manager_id_ref = useRef(null);

  const onSubmit = async (data: FieldValues) => {
    const { manager_ids_input } = data;

    if (manager_ids.includes(manager_ids_input)) {
      setError("manager_ids_input", {
        type: "manual",
        message: "The Manager Id already exists.",
      });
    } else {
      setLoading(true);

      // Check FPL API if user exists.
      const res = await doesManagerExist(manager_ids_input);

      if (res) {
        setManager_ids((prev) => [...prev, manager_ids_input]);

        reset();
      } else {
        setError("manager_ids_input", {
          type: "manual",
          message: "This Manager does not exist in the FPL database.",
        });
      }
    }

    setLoading(false);
  };

  return (
    <Card className="mt-4">
      <CardHeader>Manager Ids</CardHeader>
      <CardContent>
        <Label htmlFor="manager_ids">Please enter a Manager Id</Label>
        <div className="mt-1">
          <form onSubmit={handleSubmit(onSubmit)} className="flex">
            <Input
              ref={manager_id_ref}
              className="mr-5"
              type="number"
              onKeyDown={(e) => {
                if (e.key === "e" || e.key === "-") {
                  e.preventDefault();
                }
              }}
              {...register("manager_ids_input", {
                valueAsNumber: true,
              })}
            />

            <Button type="submit" disabled={!watch("manager_ids_input")}>
              {loading ? "Loading..." : "Add"}
            </Button>
          </form>
          {errors.manager_ids_input ? (
            <Alert variant="destructive" className="my-2 rounded">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle className="font-bold">Error</AlertTitle>
              <AlertDescription>
                {errors.manager_ids_input.message}
              </AlertDescription>
            </Alert>
          ) : null}
        </div>
        {manager_ids.length > 0 ? (
          <ul className="mt-2">
            {manager_ids.map((id) => {
              return (
                <li key={id} className="flex items-center">
                  <Cross2Icon
                    className="mr-2 h-4 w-4 cursor-pointer"
                    onClick={() => {
                      const updated_manager_ids = manager_ids.filter(
                        (e) => e !== id,
                      );

                      setManager_ids(updated_manager_ids);
                    }}
                  />
                  {id}
                </li>
              );
            })}
          </ul>
        ) : null}
        {manager_ids.length > 0 ? (
          <Button
            className="ml-auto mt-8 block"
            onClick={() => {
              updateManagerRow(manager_ids);
            }}
          >
            Add to site
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ManagerIds;
