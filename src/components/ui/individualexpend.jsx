/**
 * v0 by Vercel.
 * @see https://v0.dev/t/z3weXqpDeBR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Component() {
  const [individualInfo, setIndividualInfo] = useState({
    age: 35,
    zip: "12345",
    annualSalary: 75000,
    isExpanded: false,
  })
  const handleIndividualInfoToggle = () => {
    setIndividualInfo((prevState) => ({
      ...prevState,
      isExpanded: !prevState.isExpanded,
    }))
  }
  return (
    <section className="bg-muted/40 py-6 px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Individual Information</h2>
        <Button variant="outline" size="sm" onClick={handleIndividualInfoToggle}>
          {individualInfo.isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>
      {individualInfo.isExpanded ? (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start font-normal">
                  {individualInfo.age}
                  <ChevronsUpDownIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search age..." className="h-9" />
                  <CommandEmpty>No age found.</CommandEmpty>
                  <CommandGroup>
                    {Array.from({ length: 70 }, (_, i) => i + 21).map((age) => (
                      <CommandItem
                        key={age}
                        onSelect={() =>
                          setIndividualInfo((prevState) => ({
                            ...prevState,
                            age,
                          }))
                        }
                      >
                        {age}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">Zip Code</Label>
            <Input
              id="zip"
              type="text"
              pattern="d{5}"
              value={individualInfo.zip}
              onChange={(e) =>
                setIndividualInfo((prevState) => ({
                  ...prevState,
                  zip: e.target.value,
                }))
              }
              className="w-24"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary">Annual Salary</Label>
            <Input
              id="salary"
              type="number"
              min="0"
              value={individualInfo.annualSalary}
              onChange={(e) =>
                setIndividualInfo((prevState) => ({
                  ...prevState,
                  annualSalary: parseInt(e.target.value),
                }))
              }
              className="text-right"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div>
            <div className="text-muted-foreground">Age</div>
            <div className="font-medium">{individualInfo.age}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Zip Code</div>
            <div className="font-medium">{individualInfo.zip}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Annual Salary</div>
            <div className="font-medium">
              $
              {individualInfo.annualSalary.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Avatar</div>
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}
    </section>
  )
}

function ChevronsUpDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  )
}